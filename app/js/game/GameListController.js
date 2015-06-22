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
	var username = $cookies.get('username');
	this.init = function()
	{ 
		$scope.populate('');
	}

	$scope.addGame = function(game){
		GameService.addGame(game);
	};

	$scope.joinGame = function(game){
		console.log(game);
		GameService.joinGame(game);
	}

	$scope.canJoin = function(game) {
		if (game.state != 'open') {
			return false;
		}
		if (game.players.length >= game.maxPlayers) {
			return false;
		}
		for (i = 0; i < game.players.length; i++) {
			if (game.players[i]._id == username) {
				return false;
			}
		}
		return true;
	}

	$scope.canView = function(game) {
		if (game.state == 'playing') {
			for (var i = game.players.length - 1; i >= 0; i--) {
				if(username == game.players[i]._id)
				{
					return true;
				}
			}
		}
		return false;
	}

	$scope.canStart = function(game) {
		if (game.state != 'open') {
			return false;
		}
		if (game.players.length < game.minPlayers)
		{
			return false;
		}
		if (game.createdBy._id != username) {
			return false;
		}
		return true;
	}

	$scope.startGame = function(game){
		console.log(game);
		GameService.startGame(game);
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

	this.init();
});