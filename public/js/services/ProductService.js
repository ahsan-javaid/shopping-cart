angular.module('ProductService', []).factory('ProductService', ['$http', function($http) {


    return{
        getProducts: function (success, error)
        {
            $http.get('/product').
                success(function (data,status,headers) {
                    console.log("s",arguments,"s")
                    success(data);
                }).
                error(function (data) {
                    error(data);
                });
        },
        getProduct: function (id,success, error)
        {
            $http.get('/product/'+id).
                success(function (data) {
                    success(data);
                }).
                error(function (data) {
                    error(data);
                });
        },
        getCart: function (success, error)
        {
            $http.get('/cart').
                success(function (data) {
                    success(data);
                }).
                error(function (data) {
                    error(data);
                });
        }
        ,
        addToCart: function (product,success, error)
        {
            $http.post('/cart',product).
                success(function (data) {
                    success(data);
                }).
                error(function (data) {
                    error(data);
                });
        },
        removeFromCart: function (id,success, error)
        {
            $http.delete('/cart/'+id).
                success(function (data) {
                    success(data);
                }).
                error(function (data) {
                    error(data);
                });
        },
        checkout: function (success, error)
        {
            $http.delete('/checkout').
                success(function (data) {
                    success(data);
                }).
                error(function (data) {
                    error(data);
                });
        }
    }
}]);