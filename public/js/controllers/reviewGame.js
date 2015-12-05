app.controller("ReviewGameController", function($scope, gameData, userData){

    $scope.scp_userData = userData.getUserData();
    $scope.scp_gameData = gameData.getGameData();


    $scope.sendScore = function(){

    	var newScore = {
    		name: $scope.scp_userData.name,
    		score: $scope.scp_gameData.score
    	};

    	$http.post("/api/highScores", newScore).success(function(response){
            console.log(response);
        });
    }

    $scope.$on("$viewContentLoaded", function(){
        $scope.sendScore();
    });
});
