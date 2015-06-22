angular.module('webs6').config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  //$urlRouterProvider.otherwise("/list/1");
  //
  // Now set up the states
  $stateProvider
    .state('games', {
      url: '/list/:page',
      templateUrl: 'views/game-list.html',
      controller  : 'GameListController'
    })
    .state('game-detail', {
    	url: '/games/:gameId',
    	templateUrl: 'views/game-detail.html',
    	controller: 'GameController'
    })
    .state('game-layout', {
    	url: '/template/:layout',
    	templateUrl: 'views/game-detail.html',
    	controller: 'GameTemplateController'
    })
    .state('login-callback', {
      url: '/login/callback?username&token',
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })

});