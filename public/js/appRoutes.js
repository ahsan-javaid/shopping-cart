angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/product.html',
			controller: 'ProductController'
		})

		.when('/view/product/:id', {
			templateUrl: 'views/product-detail.html',
			controller: 'ProductDetailController'
		})

		.when('/cart', {
			templateUrl: 'views/cart.html',
			controller: 'CartController'
		});

	$locationProvider.html5Mode(true);

}]);