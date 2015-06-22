angular.module('webs6').controller('GameListController', function(GameService, UserService,$cookies, $http, $scope, $rootScope, $stateParams){
	this.games;
	this.game = {"layout": "Ox", "minPlayers":2, "maxPlayers":3};
	$scope.loading = true;
	$scope.curGame;
	$scope.pageEntryNum = 10;
	$scope.pageNum = $stateParams.page;
	$scope.searchState;
	$scope.searchLayout;
	$scope.searchName;
	this.init = function()
	{ 
		$scope.populate('');
	}

	$scope.addGame = function(game){
		GameService.addGame(game);
	};

	this.joinGame = function(game){
		GameService.joinGame(UserService.player, game);
	}

	$scope.expandInfo = function(game){
		$scope.curGame = game;
	}

	$scope.pageNumbers = function()
	{
		var arr = [];
		for (var i = 0; i < 10; i++) {
			arr.push(+$scope.pageNum + +i);
		};
		return arr;
	}

	$scope.search = function()
	{
		var query;
		if($scope.searchLayout != null)
		{
			query = query + '&gameTemplate=' + $scope.searchLayout;
		}
		if($scope.searchState != null)
		{
			query = query + '&state=' + $scope.searchState;
		}
		console.log(query);
		$scope.populate(query);
	}

	$scope.populate = function(searchTerm)
	{
		var gamesCtrl = $scope;
      	GameService.getGames($scope.pageEntryNum, ($scope.pageNum - 1) * $scope.pageEntryNum, searchTerm).then(function(response){
      		gamesCtrl.games = response.data;
      		$scope.loading = false;
      	});
	}

	$scope.reset = function()
	{
		$scope.populate('');
	}

	$scope.participating = function(game)
	{
		if(game.createdBy.name == UserService.name){
			return true;
		}
		for (var i = game.players.length - 1; i >= 0; i--) {
			var player = game.players[i].name;
			if(UserService.name == player)
			{
				return true;
			}
		};
		return false;
	}

	this.init();
});