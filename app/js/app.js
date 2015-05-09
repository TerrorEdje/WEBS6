require('angular/angular');

// Create your app
var app = angular.module('webs6', []);

//home screen imports
require('./game/GameListDirectives.js');
require('./game/GameListController.js');

//services
require('./services/GameService.js');
require('./services/UserService.js');

//routes
//require('./routes.js');
