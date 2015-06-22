angular.module('webs6').controller('LoginController', function(UserService, $http, $scope, $stateParams,$window,$cookies){
      var username = $stateParams.username;
      var token = $stateParams.token;
      
      if (username != undefined && token != undefined) {
            $cookies.put('username',username);
            $cookies.put('token',token);
            $window.location.href = '/';
      }

      if ($cookies.get('username') != undefined && $cookies.get('token') != undefined) {
            $scope.user = { _id: $cookies.get('username'), username: $cookies.get('username'), token: $cookies.get('token') };
            $cookies.put('user', JSON.stringify($scope.user));
      }

      $scope.launchLogin = function () {
            $window.location.href = 'http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://localhost:8080/%23/login/callback';
      }

      $scope.logout = function() {
            $cookies.remove('user');
            $cookies.remove('username');
            $cookies.remove('token');
            $window.location.href = '/';
      }
});