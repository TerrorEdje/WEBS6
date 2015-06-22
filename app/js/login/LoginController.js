angular.module('webs6').controller('LoginController', function(UserService, $http, $scope, $stateParams,$window){
      var username = $stateParams.username;
      var token = $stateParams.token;
      
      console.log(UserService);
      if (username != undefined && token != undefined) {
            UserService.username = username;
            UserService.token = token;
            $window.location.href = '/';
      }

      $scope.launchLogin = function () {
            $window.location.href = 'http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://localhost:8080/%23/login/callback';
      }
      //$scope.launchLogin();
});