require('angular/angular');
require('angular-route/angular-route');
require('angular-scroll/angular-scroll');

// Create your app
var app = angular.module('webs6', ['ngRoute', 'duScroll']);

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
