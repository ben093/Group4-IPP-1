app.controller('HscoresController', function($rootScope, $scope, $http) {

    //need to do a POST request to get the highscores data

    $scope.highscores = $rootScope._highScores || {};

    $scope.init = function(){
		//GET request for the images
		$http.get('/api/highScores').success(function(data, response){
			$scope.highscores = data;
		});
    }

});
