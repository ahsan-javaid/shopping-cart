angular.module('CartCtrl', []).controller('CartController', function($scope, $location,$timeout, ProductService) {


    ProductService.getCart(function (data) {
        $scope.products = data.response;
    }, function (err) {
        $scope.err= err;
    });
    $scope.removeFromCart=function(product,index){
        ProductService.removeFromCart(product.id,function(data){
            $scope.products.splice(index,1);
            $scope.msg = data.message;
            $timeout(function () {
                $scope.msg='';
            },3000);
        }, function (err) {
        })
    }
    $scope.checkout = function(){
        ProductService.checkout(function (data) {
            $location.path('/');

        },function(err){
        })
    }
    $scope.viewDetail = function (id) {
        $location.path('/view/product/'+id);
    }
});