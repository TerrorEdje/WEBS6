angular.module('everyware.web').config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "views/game-list.html",
        controller  : 'GameListController'
    });
});

           /* // route for the home page
            .when('/home', {
                templateUrl : 'views/game-list.html',
                controller  : 'GameListController'
            })

            // route for the detail game
            .when('/games/:gameId', {
                templateUrl : 'views/game-detail.html',
                controller  : 'GameController'
            })

            // route for the game template view
            .when('/template/:layout', {
                templateUrl : 'views/game-detail.html',
                controller  : 'GameTemplateController'
            })

            .otherwise({
                redirectTo: '/home'
            })
    });*/