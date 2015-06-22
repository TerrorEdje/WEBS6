require('angular/angular');
require('angular-route/angular-route');
require('angular-scroll/angular-scroll');
require('angular-ui-router/release/angular-ui-router');
require('angular-cookies/angular-cookies');

// Create your app
var app = angular.module('webs6', ['ui.router','ngCookies', 'duScroll']);

app.factory('httpRequestInterceptor', function($cookies) {
  return {
    request: function (config) {
        config.headers['Content-Type'] = 'application/json';
		config.headers['x-username'] = $cookies.get('username');
        config.headers['x-token'] = $cookies.get('token');
    	
      	return config;
    }
  };
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});

require('./login/LoginController.js');

//home screen imports
require('./game/GameListDirectives.js');
require('./game/GameListController.js');

//detail screen imports
require('./game/GameController.js');

//template screen imports
require('./game/GameTemplateController.js');

//services
require('./services/GameService.js');
require('./services/UserService.js');

//routes
require('./routes.js');
