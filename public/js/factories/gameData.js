app.factory("gameData", function(){
	var service = {};

	var _gameData = {
		score: 0,
		correctSelections: 0,
		imageStreak: 0,
		highestLevel: 0
	};

	service.getGameData = function(){
		return _gameData;
	};

	service.updateGameData = function(newData){
		_gameData = newData;
	};

    return service;
});
