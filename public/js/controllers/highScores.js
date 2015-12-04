app.controller('HscoresController', function($rootScope, $scope, $http) {

    //need to do a POST request to get the highscores data

    $scope.highscores = $rootScope._highScores;

});
