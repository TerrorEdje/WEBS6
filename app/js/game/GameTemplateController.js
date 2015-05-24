angular.module('webs6').controller('GameTemplateController', function(GameService, $http, $scope, $routeParams){
      $scope.game = {name: "Mahjong Mayhem", minPlayers: "-", maxPlayers: "-", state:"template", createdBy: {name: "Mahjong Mayhem"}, gameTemplate: {_id:$routeParams.layout}};
	$scope.layout = $routeParams.layout;
	$scope.rows;
      $scope.loading = true;
	this.init = function()
	{ 
      	this.getRows();
	}

	this.getRows = function()
	{
		GameService.getGameTemplate($scope.layout).then(function(response){
      		var tiles = response.data.tiles;
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
                  $scope.loading = false;
      	});
	}
	this.init();
});