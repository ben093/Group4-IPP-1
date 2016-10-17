app.factory("userData", function(){
	var service = {};

	var _userData = {
		name: "",
		age: "",
		gender: "",
		imageSet: []
	};

	service.pushItem = function(item){
		_userData.imageSet.push(item);
	};

	service.removeItem = function(item){
		var index = _userData.imageSet.indexOf(item);
		_userData.imageSet.splice(index, 1);
	};

	service.setUserData = function(newData){
		_userData = newData;
	};

	service.getUserData = function(){
		return _userData;
	};

	return service;
});
