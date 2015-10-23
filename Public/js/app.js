// public/js/app.js
var app = angular.module('QuickSight', ['ui.router'])

app.factory("userData", function(){
    return { name: "", age: "", gender: "", imageSet:[]};
});


app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        //HOME PAGE
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: "MainController"
        })

        //GAME PAGE
        .state('game', {
            url: '/game',
            templateUrl: 'views/game.html',
            controller: "GameController"
        })

        //HIGH SCORES PAGE
        .state('hscores', {
            url: '/hscores',
            templateUrl: 'views/hscores.html',
            controller: "HscoresController"
        })

        //PLAY GAME PAGE
        .state('play', {
            url: '/play',
            templateUrl: 'views/playGame.html',
            controller: "PlayGameController"
        })
        
        //INFO PAGE
        .state('info', {
            url: '/info',
            templateUrl: 'views/info.html',
            controller: "InfoController"
        }); 
});


app.controller('MainController', function($scope, $http, userData) {
    $scope.tagline = "MainControl";

    $scope.userData = userData;

    $scope.submit = function(){
        window.location = '#/game';
    }
});

app.controller('GameController', function($scope, userData) {

    $scope.userSet = [1,2,3];

    $scope.mainImgDir = $scope.userSet.length;

    $http.get('#/game').success(function(response){
        $scope.responseData = response;
    });

    $scope.addItem = function(event){
        //Uncomment to make sure you are getting the correct img id
        //alert("clicked: " + event.target.id);

        //set a requirement of 5 images
        if($scope.userSet.length == 5){
            alert("Maximun images selected.");
        }else if($.inArray(event.target.id, $scope.userSet) == -1){
            //push the image id into the userSet
            $scope.userSet.push(event.target.id);
        }else{
            //do not push
        }
    }

    $scope.removeItem = function(event){
        //retrieve the index of the selected image
        var index = $scope.userSet.indexOf(event.target.id);
        
        //remove the element from the userSet
        $scope.userSet.splice(index, 1);
    }

    //Fires once the user is trying to commit their image set on Game Page
    $scope.confirmImageSet = function(){
        if($scope.userSet.length != 5){
            alert("Must select exactly 5 images.");
        }else{
            //push the imageSet to the db
            //start the game
            userData.imageSet = $scope.userSet;
            window.location = '#/play';
        }
    }
});

app.controller('PlayGameController', function($scope, userData) {

    $scope.userStuff = userData;

    $scope.totSeconds = 60;

    $scope.userScore = 0;

    $scope.beginButton = function(){
        window.setTimeout('tick', 1000);
    }

    $scope.tick = function(){
        $scope.totSeconds -= 1;
    }

    /*function UpdateTimer(){
        window.setTimeout('tick()', 1000);
    }*/

   /* function tick(){
        if($scope.totSeconds <= 0){
            $scope.gameMessage = "Time's up!";
            return;
        }

        $scope.totSeconds -= 1;
        UpdateTimer();
    }*/

    $scope.beginGame = function(){
        //begin game here
    }
});

app.controller('InfoController', function($scope) {
    //$scope.tagline = "InfoControl";

    $scope.developers = [" Benjamin Borgstede",
                            "Casey Brown",
                            "Spencer Martin",
                            "Zachary Metcalf",
                            "Anthony Van"];
});

app.controller('HscoresController', function($scope) {
    //$scope.tagline = "HscoresControl";

    $scope.highscores = [{name: "Zeus", score: "988,234,453"},
                         {name: "Obama",score: "22,234,363"},
                         {name: "Beetlejuice", score: "2,838,472"},
                         {name: "Anthony", score: "22"}];
});