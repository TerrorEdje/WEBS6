describe("GameService", function() {
	var gameService;
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
	}));

	it('should call createGame once', function(done){
		// Given
		var expectedGame = {"templateName": "Ox", "minPlayers":2, "maxPlayers":3};
		
		var expectedData = JSON.stringify(expectedGame);
		
		var response = gameService.addGame(expectedGame);
		
		response.then(function(data) {
			done();
		});
		
		httpBackend
			.expectPOST("http://mahjongmayhem.herokuapp.com/games", expectedData)
			.respond(200, {status: "success"});

		httpBackend.flush();

		expect(scope.status).to.equal("success");
	});
});
