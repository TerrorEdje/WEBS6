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
            console.log(canMatch(tile));
            if(canMatch(tile)){
                  var matchTile = $scope.matchTile;
                  console.log(tile);
                  if(matchTile != null)
                  {
                        if(
                              ((matchTile.tile.matchesWholeSuit && matchTile.tile.suit == tile.tile.suit) 
                               || (matchTile.tile.suit == tile.tile.suit && matchTile.tile.name == tile.tile.name))
                              &&(matchTile.tile != tile.tile)

                        ){
                              GameService.postGameTiles($scope.game,tile,matchTile);
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

      function canMatch(tile){
            var z = tile.zPos;
            var x = tile.xPos;
            var y = tile.yPos;
            for (var i = $scope.tiles.length - 1; i >= 0; i--) {
                  var curTile = $scope.tiles[i];
                  if(curTile.zPos > z)
                  {
                        if(
                              (curTile.xPos == x + 1 || curTile.xPos == x - 1)&&
                              (curTile.yPos == y + 1 || curTile.yPos == y - 1)
                        ){
                              return false;
                        }
                  }
            };
            return true;
      }
});