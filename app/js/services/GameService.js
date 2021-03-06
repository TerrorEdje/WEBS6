angular.module('webs6').service('GameService', function($http){

	this.addGame = function(game)
	{
		if(this.validateGame(game))
		{
			return this.postGame(game);
		}else{
			alert("error in game format: game validation failed");
		}
	}

	this.validateGame = function(game)
	{
		console.log(game);
		if(game.templateName != null && game.minPlayers > 0 && game.maxPlayers <= 100){
			return true;
		}else{
			return false;
		}
	}

	this.postGame = function(game)
	{
		return $http.post('http://mahjongmayhem.herokuapp.com/games', game).
	    success(function(data, status, headers, config) {
	    }).
	    error(function(data, status, headers, config) {
	     	alert('error in api request');
	    });
	};

	this.startGame = function(game)
	{
		return $http.post('http://mahjongmayhem.herokuapp.com/games/' + game.id + '/start').
	    success(function(data, status, headers, config) {
	    }).
	    error(function(data, status, headers, config) {
	    	console.log(data);
	     	alert('error in api request');
	    });
	}

	this.joinGame = function(game)
	{
		console.log(game);
		return $http.post('http://mahjongmayhem.herokuapp.com/games/' + game.id + '/players').
	    success(function(data, status, headers, config) {
	    }).
	    error(function(data, status, headers, config) {
	    	console.log(data);
	     	alert('error in api request');
	    });
	};

	this.getGames =  function(maxResult, start, searchTerm){
		var query =  '?pageSize=' + maxResult + '&pageIndex=' + start;
		if(searchTerm && searchTerm != null && searchTerm.length > 0){
			query = query + searchTerm;
		}
		return $http.get('http://mahjongmayhem.herokuapp.com/games' + query).
	    success(function(data, status, headers, config) {
	    }).
	    error(function(data, status, headers, config) {
	     	alert('error in api request');
	    });
	};

	this.getGame = function(id){
		return $http.get('http://mahjongmayhem.herokuapp.com/games/' + id).
	    success(function(data, status, headers, config) {
	    }).
	    error(function(data, status, headers, config) {
	     	alert('error in api request');
	    });
	}

	this.getGameTiles = function(id){
		return $http.get('http://mahjongmayhem.herokuapp.com/games/' + id + '/tiles').
	    success(function(data, status, headers, config) {
	    }).
	    error(function(data, status, headers, config) {
	     	alert('error in api request');
	    });
	}

	this.getGameTemplate = function(layout){
		return $http.get('http://mahjongmayhem.herokuapp.com/gameTemplates/' + layout).
	    success(function(data, status, headers, config) {
	    }).
	    error(function(data, status, headers, config) {
	     	alert('error in api request');
	    });
	}

	this.postGameTiles = function(game,tile1,tile2) {
		var tiles = { tile1Id: tile1._id, tile2Id: tile2._id };
		return $http.post('http://mahjongmayhem.herokuapp.com/games/' + game._id + '/tiles/matches',tiles).
	    success(function(data, status, headers, config) {
	    }).
	    error(function(data, status, headers, config) {
	    	console.log(data);
	     	alert('error in api request');
	    });
	}
});