angular.module('ProductCtrl', []).controller('ProductController', function($scope,$location,$timeout, ProductService) {


    ProductService.getProducts(function (data) {
        console.log(data);
        $scope.products = data.response;

    }, function (err) {
        $scope.err= err;
    });
    $scope.viewDetail = function (id) {
        $location.path('/view/product/'+id);
    }
    $scope.addToCart = function(product,index){
        ProductService.addToCart(product, function (data) {
            $scope.products.splice(index,1);
            $scope.msg = data.message;
            $timeout(function () {
                $scope.msg='';
            },3000)

        }, function (err) {
        });

    }
});