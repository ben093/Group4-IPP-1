app.controller("ReviewGameController", function($scope, gameData, userData){

    $scope.scp_userData = userData.getUserData();
    $scope.scp_gameData = gameData.getGameData();
});
