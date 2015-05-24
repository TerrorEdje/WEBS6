require('angular/angular');
require('angular-route/angular-route.js');

// Create your app
var app = angular.module('webs6', ['ngRoute']);

//home screen imports
require('./game/GameListDirectives.js');
require('./game/GameListController.js');

//detail screen imports
require('./game/GameController.js');

//services
require('./services/GameService.js');
require('./services/UserService.js');

//routes
require('./routes.js');
