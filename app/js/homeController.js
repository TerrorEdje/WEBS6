angular.module('webs6').controller('HomeController', function(UserService, $http, $scope, $rootScope){
	$scope.user = UserService.player;
	this.init = function()
	{ 
		console.log($scope.user);
	}
	this.init();
});