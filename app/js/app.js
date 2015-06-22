require('angular/angular');
require('angular-route/angular-route');
require('angular-scroll/angular-scroll');
require('angular-ui-router/release/angular-ui-router');

// Create your app
var app = angular.module('webs6', ['ui.router', 'duScroll']);

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
