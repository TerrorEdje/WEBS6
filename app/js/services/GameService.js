angular.module('webs6').service('GameService', function($http){
	this.games = [
		{
		 "layout": "shanghai", // -> 'shanghai'|'snake'|'ox'|'ram'|'dragon'|'rooster'|'monkey'
		 "createdOn": "date", // date + time
		 "startedOn": "date", // date + time
		 "endedOn": "date", // date + time
		 "createdBy": {
		   "id": "yahegge", // Avans username
		   "name": "Yannik Hegge", // fullname
		   "email": "yannikhegge@gmail.com", // avans e-mail
		   "nickname": "yahegge" // maybe filled later?
		 },
		 "minPlayers": "2", // 35 <= x >= 1, Required number of players to start
		 "maxPlayers": "3",  // 35 <= x >= 1
		 "players": [{
		   "id": "egjhattink", // Avans username
		   "name": "Edwin Hattink", // fullname
		   "email": "edwin@hattink.io", // avans e-mail
		   "nickname": "TERROR_EDJE" // maybe filled later?
		   // Properties like score and isWinner maybe filled later
		 }],
		 "state": "open" // -> 'open'|'playing'|'finished'
		},
		{
		 "layout": "dragon", // -> 'shanghai'|'snake'|'ox'|'ram'|'dragon'|'rooster'|'monkey'
		 "createdOn": "date", // date + time
		 "startedOn": "date", // date + time
		 "endedOn": "date", // date + time
		 "createdBy": {
		   "id": "egjhattink", // Avans username
		   "name": "Edwin Hattink", // fullname
		   "email": "edwin@hattink.io", // avans e-mail
		   "nickname": "TERROR_EDJE" // maybe filled later?
		   // Properties like score and isWinner maybe filled later
		 },
		 "minPlayers": "2", // 35 <= x >= 1, Required number of players to start
		 "maxPlayers": "15",  // 35 <= x >= 1
		 "players": [{
		   "id": "yahegge", // Avans username
		   "name": "Yannik Hegge", // fullname
		   "email": "yannikhegge@gmail.com", // avans e-mail
		   "nickname": "yahegge" // maybe filled later?
		 },
		 {
		   "id": "hehenkson", // Avans username
		   "name": "Henk Henkson", // fullname
		   "email": "henkhenkson@gmail.com", // avans e-mail
		   "nickname": "hehehenk" // maybe filled later?
		 }],
		 "state": "finished" // -> 'open'|'playing'|'finished'
		},
		{
		 "layout": "ox", // -> 'shanghai'|'snake'|'ox'|'ram'|'dragon'|'rooster'|'monkey'
		 "createdOn": "date", // date + time
		 "startedOn": "date", // date + time
		 "endedOn": "date", // date + time
		 "createdBy": {
		   "id": "egjhattink", // Avans username
		   "name": "Edwin Hattink", // fullname
		   "email": "edwin@hattink.io", // avans e-mail
		   "nickname": "TERROR_EDJE" // maybe filled later?
		   // Properties like score and isWinner maybe filled later
		 },
		 "minPlayers": "2", // 35 <= x >= 1, Required number of players to start
		 "maxPlayers": "5",  // 35 <= x >= 1
		 "players": [{
		   "id": "yahegge", // Avans username
		   "name": "Yannik Hegge", // fullname
		   "email": "yannikhegge@gmail.com", // avans e-mail
		   "nickname": "yahegge" // maybe filled later?
		 }],
		 "state": "finished" // -> 'open'|'playing'|'finished'
		}
	];

	this.addGame = function(game)
	{
		this.games.push(game);
	};

	this.joinGame = function(player, game)
	{
		if(game.maxPlayers > game.players.length + 1)
		{
			game.players.push(player);	
		}
	};

	this.getGames =  function(){
		return $http.get('http://mahjongmayhem.herokuapp.com/games').
	    success(function(data, status, headers, config) {
	      //console.log('api returns: ' + data);
	      //return data;
	    }).
	    error(function(data, status, headers, config) {
	     	alert('error in api request');
	    });
	};
});