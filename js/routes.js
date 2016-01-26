angular.module('myapp')
    .config(function($routeProvider) {
        $routeProvider
        .when('/post/:id', {
            templateUrl: 'pages/post/index.html',
            controller: 'PostController',
        })
        .when('/detail/:id', {
            templateUrl: 'pages/detail/index.html',
            controller: 'DetailController',
        })
       
		.when('/about_us', {
            templateUrl: 'pages/about_us/index.html',
		})
        .when('/video', {
            templateUrl: 'pages/video/index.html',
             controller: 'videoController',
		})
		.when('/', {
            templateUrl: 'pages/home/index.html',
            controller: 'IndexController',
		});
});