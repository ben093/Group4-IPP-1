app.factory("userData", function(){
	var service = {};

	var _userData = {
		name: "",
		age: "",
		gender: "",
		imageSet: []
	};

	service.setUserData = function(newData){
		_userData = newData;
	};

	service.getUserData = function(){
		return _userData;
	};

	return service;
});
