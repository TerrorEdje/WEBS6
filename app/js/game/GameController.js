angular.module('webs6').controller('GameController', function(GameService, UserService, $http, $scope, $stateParams,$cookies){
      $scope.game = {name: "Mahjong Mayhem", minPlayers: "-", maxPlayers: "-", state:"template", createdBy: {name: "Mahjong Mayhem"}, gameTemplate: {_id:$stateParams.gameId}};
	$scope.gameId = $stateParams.gameId;
	$scope.tiles;
      $scope.loadingInfo = true;
      $scope.loadingTiles = true;
      $scope.loading = true;
      $scope.waiting = true;
      $scope.matchTile = null;
      $scope.playing = false;
	this.init = function()
	{ 

		loadView();
            webSocket();
      }
	this.init();
      var init = this.init();

      function loadView(){
            var gamesCtrl = $scope;
            GameService.getGame(gamesCtrl.gameId).then(function(response){
                  gamesCtrl.game = response.data;
                  $scope.loadingInfo = false;
                  checkLoading();
                  if(gamesCtrl.game.state != 'open')
                  {
                        gamesCtrl.waiting = false;
                        if(gamesCtrl.state != 'finished')
                        {
                        	gamesCtrl.playing = false;
                        }
                        gamesCtrl.playing = true;
                        loadTiles();
                  }
            });
      }

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
                              //removeTile(tile._id);
                              //removeTile(matchTile._id);
                              
                        }else{
                              console.log('no match!')
                        }
                        $scope.matchTile = null;
                  }else{
                        $scope.matchTile = tile;
                  }
            }            
      }

      function loadTiles() {
            var gamesCtrl = $scope;
            GameService.getGameTiles(gamesCtrl.gameId).then(function(response){
                  gamesCtrl.tiles = response.data;
                  $scope.loadingTiles = false;
                  checkLoading();
            });
      }

      function webSocket() {
            var socket = io("http://mahjongmayhem.herokuapp.com/?gameId=" + $scope.gameId);

            socket.on('match', function(data) {
                  setMatched(data[0]);
                  setMatched(data[1]);
               	  console.log('WEBSOCKET');
            });

            socket.on('start', function() {
                  loadView();
            });

            socket.on('playerJoined', function(data){
                  loadView();
            });

            socket.on('end', function(){
            	$scope.playing = false;
            });
      }

      function checkLoading(){
            if(!$scope.loadingTiles && !$scope.loadingInfo && !$scope.waiting)
            {
                  $scope.loading = false;
            }
      }
      function setMatched(tile){
            console.log('beginsetmatched');
            for (var i = $scope.tiles.length - 1; i >= 0; i--) {
                  if(tile._id == $scope.tiles[i]._id)
                  {
                        console.log('setMatched');
                        $scope.tiles[i] = tile;
                  }
            };
      }

      function canMatch(tile){
      		if(!$scope.playing)
      		{
      			return false;
      		}
            var z = tile.zPos;
            var x = tile.xPos;
            var y = tile.yPos;
            for (var i = $scope.tiles.length - 1; i >= 0; i--) {
                  var curTile = $scope.tiles[i];
                  if(curTile.zPos > z && !curTile.match)
                  {
                        if(
                              (curTile.xPos == x + 1 || curTile.xPos == x - 1 || curTile.xPos == x)&&
                              (curTile.yPos == y + 1 || curTile.yPos == y - 1 || curTile.yPos == y)
                        ){
                              return false;
                        }
                  }
            };
            return true;
      }
});