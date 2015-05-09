angular.module('webs6').controller('GameListController', function(GameService, UserService, $http, $scope, $rootScope){
	this.games;
	this.game = {"layout": "Ox", "minPlayers":2, "maxPlayers":3};
	this.init = function()
	{ 
		var gamesCtrl = $scope;
      	GameService.getGames().then(function(response){
      		gamesCtrl.games = response.data;
      	});
	}

	this.addGame = function(){
		var game = this.game;
		game.createdBy = UserService.player;
		game.createdOn = Date.now();
		game.state = 'open';
		GameService.addGame(game);
	};

	this.joinGame = function(game){
		GameService.joinGame(UserService.player, game);
	}

	this.init();
});