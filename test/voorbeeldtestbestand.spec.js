/*describe("GameController", function() {
	var gameController;
	var gameService;
	var createNewController;
	var httpBackend;
	var scope;
	
	// initialize the app
	beforeEach(module('webs6'));

	// Inject the modules and get them in global variables
	beforeEach(inject(function($rootScope, $controller, $httpBackend, $injector){
		// The scope for the controller
		scope = $rootScope.$new();
		// Get the service which will be injected
		gameService = $injector.get('GameService');
		// For mocking the backend
		httpBackend = $httpBackend;

		// Stubbing with sinon
		gameService.sayHello = sinon.stub();
		gameService.sayHello.withArgs('Test').returns('Stub says hi Test');
		gameService.sayHello.returns('Hi from stub');
		
		// This is the controller we're going to test
		gameController = $controller('GameController', { $scope: scope });
	}));

	it('should mock the httpbackend', function(){
		// Given
		var game = gameService.games[0];
		var expectedCode = 'WEBS6';
		var expectedError = 'Game not found';
		// Nu expecten we het omdat we in de test zitten.
		// Bij de before of beforeEach kunnen we ook whenPost stubben
		httpBackend
			.expectPOST('http://api.myApp.com/games/' + game.id , { code: expectedCode })
			.respond(404, { err: expectedError });

		// When
		//gameController.addCourse(game, expectedCode);
		httpBackend.flush(); // Voer synchroon uit ipv asynchroon

		// Then
		expect(scope.error).to.equal(expectedError);
		expect(person.courses).to.have.length(0);
	});*/
	
	/*it('should return a game', function () {
		var game = gameService.games[0];
		expect(game.layout).to.equal('shanghai');
	});

	it('should add a game',function () {
		var game = gameService.games[0];
		gameService.addGame(game);
	});
});
*/