angular.module('webs6').controller('LoginController', function(UserService, $http, $scope, $stateParams,$window,$cookies){
      var username = $stateParams.username;
      var token = $stateParams.token;
      
      if (username != undefined && token != undefined) {
            $cookies.put('username',username);
            $cookies.put('token',token);
            console.log(token);
            console.log($cookies.get('username'));
            UserService.name = username;
            UserService.token = token;
            //$window.location.href = '/#/list/1';
      }

      $scope.launchLogin = function () {
            $window.location.href = 'http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://localhost:8080/%23/login/callback';
      }
      //$scope.launchLogin();
});