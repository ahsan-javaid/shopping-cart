angular.module('ProductDetailCtrl', []).controller('ProductDetailController', function($scope,$routeParams,$timeout,ProductService) {

    ProductService.getProduct($routeParams.id, function (data) {
        $scope.product = data.response.product;
        $scope.inCart = data.response.inCart;

    }, function (err) {
        $scope.err=err;
    });

    $scope.removeFromCart = function(){
        ProductService.removeFromCart($scope.product.id,function(data){
            $scope.inCart =  !$scope.inCart;
            $scope.msg = data.message;
            $timeout(function () {
                $scope.msg='';
            },3000);
        }, function (err) {
        })
    }
    $scope.addToCart = function(product){
        ProductService.addToCart($scope.product, function (data) {
            $scope.inCart =  !$scope.inCart;
            $scope.msg = data.message;
            $timeout(function () {
                $scope.msg='';
            },3000)

        }, function (err) {
        });
    }




});