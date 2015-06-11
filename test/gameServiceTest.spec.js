describe("GameListController", function() {
	var gameListController;
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
		gameListController = $controller('GameListController', { $scope: scope });
	}));

	it('should mock the httpbackend', function(){
		// Given
		var game = {"layout": "Ox", "minPlayers":2, "maxPlayers":3, "id":"5"};
		var expectedCode = 'WEBS6';
		var expectedError = 'Game not found';
		// Nu expecten we het omdat we in de test zitten.
		// Bij de before of beforeEach kunnen we ook whenPost stubben
		httpBackend
			.expectPOST('http://mahjongmayhem.herokuapp.com/games/' + game.id , { code: expectedCode })
			.respond(404, { err: expectedError });

		// When
		gameListController.addGame(game, expectedCode);
		httpBackend.flush(); // Voer synchroon uit ipv asynchroon

		// Then
		expect(scope.error).to.equal(expectedError);
		expect(game.layout).to.equal("Ox");
	});

	it('replace the service games', function() {
		gameService.games = [ { layout: 'Ox'} ];

		expect(gameListController.games[0].layout).to.equal('Ox');
	});
	
	it('should call addPerson once', function() {
		var expectedLayout = 'Ox', expectedminPlayers = 2;

		gameService.addGame() = sinon.stub();
		gameService.withArgs({ layout: expectedLayout}).returns({ layout: expectedLayout});

		var actual = gameListController.add(expectedLayout);

		expect(actual.layout).to.equal(expectedName);
		assert(gameService.addGame.calledOnce);
	});
});
