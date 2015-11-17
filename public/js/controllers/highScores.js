app.controller('HscoresController', function($scope) {

    //need to do a POST request to get the highscores data

    $scope.highscores = [{name: "Zeus", score: "988,234,453"},
                         {name: "Obama",score: "22,234,363"},
                         {name: "Beetlejuice", score: "2,838,472"},
                         {name: "Anthony", score: "-22"}];
});
