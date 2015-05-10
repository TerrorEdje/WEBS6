 angular.module('webs6').config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/home', {
                templateUrl : 'views/game-list.html',
                controller  : 'GameListController'
            })

            // route for the detail game
            .when('/games/:gameId', {
                templateUrl : 'views/game-detail.html',
                controller  : 'GameController'
            }).otherwise({
                redirectTo: '/home'
            })
    });