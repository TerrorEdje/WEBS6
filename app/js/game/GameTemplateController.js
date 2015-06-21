angular.module('webs6').controller('GameTemplateController', function(GameService, $http, $scope, $stateParams){
    $scope.game = {name: "Mahjong Mayhem", minPlayers: "-", maxPlayers: "-", state:"template", createdBy: {name: "Mahjong Mayhem"}, gameTemplate: {_id:$stateParams.layout}};
	$scope.layout = $stateParams.layout;
    $scope.loading = true;
    $scope.tiles;
	this.init = function()
	{
		var gamesCtrl = $scope;
      	GameService.getGameTemplate(gamesCtrl.layout).then(function(response){
      		gamesCtrl.tiles = response.data.tiles;
      		$scope.loading = false;
      		console.log(response.data.tiles);
      	});
	}
	this.init();
});