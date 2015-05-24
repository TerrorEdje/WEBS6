angular.module('webs6').controller('GameController', function(GameService, UserService, $http, $scope, $routeParams){
      $scope.game = {name: "Mahjong Mayhem", minPlayers: "-", maxPlayers: "-", state:"template", createdBy: {name: "Mahjong Mayhem"}, gameTemplate: {_id:$routeParams.gameId}};
	$scope.gameId = $routeParams.gameId;
	$scope.rows;
      $scope.loadingInfo = true;
      $scope.loadignTiles = true;
      $scope.loading = true;
	this.init = function()
	{ 
		var gamesCtrl = $scope;
      	GameService.getGame(gamesCtrl.gameId).then(function(response){
      		gamesCtrl.game = response.data;
                  $scope.loadingInfo = false;
                  checkLoading();
      	});
      	this.getRows();
	}

	this.getRows = function()
	{
		GameService.getGameTiles($scope.gameId).then(function(response){
      		var tiles = response.data;
      		var rows = [];
      		var xMax = 0; var yMax = 0;
      		for (var i = tiles.length - 1; i >= 0; i--) {
      			var tile = tiles[i];
      			if(tile.xPos > xMax) {xMax = tile.xPos}
      			if(tile.yPos > yMax) {yMax = tile.yPos}
      		};
      		for ( var i = 0; i < yMax; i++ ){ 
      			rows[i] = [];
      			for(var j = 0; j < xMax; j++){
      				rows[i][j] = [];
      			}
      		}
      		for (var i = tiles.length - 1; i >= 0; i--) {
      			var tile = tiles[i];
      			rows[tile.yPos - 1][tile.xPos - 1][tile.zPos] = tile;
      		};
      		$scope.rows = rows;
                  console.log($scope.rows); 
                  $scope.loadignTiles = false;
                  checkLoading();
      	});
	}
	this.init();

      function checkLoading(){
            if(!$scope.loadignTiles && !$scope.loadingInfo)
            {
                  $scope.loading = false;
            }
      }
});