angular.module('webs6').directive('helloWorld', function(){
	return{
		restrict: 'E',
		template: '<h1>Hello World</h1>'
	}
});
angular.module('webs6').directive('gameListTable', function(){
	return{
		restrict: 'E',
		templateUrl: './views/gameListTable.html'
	}
});
angular.module('webs6').directive('loader', function(){
	return{
		restrict: 'E',
		template: '<p ng-if="loading" class="loading"></p>'
	}
});
angular.module('webs6').directive('hoverdetail', function(){
	return{
		restrict: 'E',
		template: '<div class="hoverdetail">abc</div>'
	}
});