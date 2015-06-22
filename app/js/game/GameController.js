angular.module('webs6').controller('GameController', function(GameService, UserService, $http, $scope, $stateParams,$cookies){
      $scope.game = {name: "Mahjong Mayhem", minPlayers: "-", maxPlayers: "-", state:"template", createdBy: {name: "Mahjong Mayhem"}, gameTemplate: {_id:$stateParams.gameId}};
	$scope.gameId = $stateParams.gameId;
	$scope.tiles;
      $scope.loadingInfo = true;
      $scope.loadingTiles = true;
      $scope.loading = true;
      $scope.matchTile = null;
	this.init = function()
	{ 
		var gamesCtrl = $scope;
      	GameService.getGame(gamesCtrl.gameId).then(function(response){
      		gamesCtrl.game = response.data;
                  $scope.loadingInfo = false;
                  checkLoading();
      	});
            GameService.getGameTiles(gamesCtrl.gameId).then(function(response){
                  gamesCtrl.tiles = response.data;
                  $scope.loadingTiles = false;
                  checkLoading();
            });	
      }
	this.init();

      $scope.match = function(tile)
      {
            var matchTile = $scope.matchTile;
            console.log(tile);
            if(matchTile != null)
            {
                  if(
                        ((matchTile.tile.matchesWholeSuit && matchTile.tile.suit == tile.tile.suit) 
                         || (matchTile.tile.suit == tile.tile.suit && matchTile.tile.name == tile.tile.name))
                        &&(matchTile.tile != tile.tile)

                  ){
                        console.log('match!');
                        removeTile(tile._id);
                        removeTile(matchTile._id);
                        
                  }else{
                        console.log('no match!')
                  }
                  $scope.matchTile = null;
            }else{
                  $scope.matchTile = tile;
            }
      }

      function checkLoading(){
            if(!$scope.loadignTiles && !$scope.loadingInfo)
            {
                  $scope.loading = false;
            }
      }
      function removeTile(id){
            for (var i = $scope.tiles.length - 1; i >= 0; i--) {
                  var tile = $scope.tiles[i];
                  if(tile._id == id)
                  {
                        $scope.tiles.splice(i, 1);
                  }
            };
      }
});