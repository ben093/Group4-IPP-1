// public/js/app.js
var app = angular.module('QuickSight', ['ui.router'])

app.factory("userData", function(){
    return { name: "", age: "", gender: ""};
});

app.factory("imageSets", function(){

    var imageSets = [{"name": "Animals",
                      "imageSet":
                                    ['aliduck.jpg', 'bat.jpg', 'cat.jpg', 'coolOwl.jpeg',
                                    'dog.jpg', 'fish.jpg', 'fox.jpg', 'frog.jpg',
                                    'gecko.jpg', 'koala.jpg', 'lightsaber.jpg', 'lion.jpeg',
                                    'monkey.jpg', 'pig.jpg', 'tiger.jpg', 'turtle.jpeg', 'wolf.jpg']
                    },
                    {"name": "Places",
                     "imageSet" :
                                    ['bridge.jpg', 'city.jpg', 'cliff.jpg', 'cliff2.jpg',
                                    'coolbridge.jpg', 'fountain.jpg', 'huts.jpg', 'palmtree.jpg',
                                    'red.jpg', 'resort.jpg', 'river.jpg', 'space.jpg',
                                    'sweet.jpg', 'treehouse.jpg', 'woods.jpg']
                    },
                    {"name": "Random",
                    "imageSet" : 
                                    ['apple.jpg', 'bear.jpg', 'camera.jpg', 'cheetos.jpg',
                                    'circuitBoard.jpg', 'cliffDive.jpg', 'donut.jpg', 'dragon.jpg',
                                    'earth.gif', 'einstein.jpg', 'faceless.jpg', 'fried_egg.jpg',
                                    'honestabe.jpg', 'hottie.jpg', 'jacked.jpg', 'jackolantern.jpg',
                                    'leaningtower.jpg', 'leatherChair.jpg', 'math.jpg', 'mikemyers.jpg',
                                    'paweater.jpg', 'poker.jpg', 'retroCar.jpg', 'rose.jpg',
                                    'sailboat.jpg', 'seal.jpg', 'shark.jpg', 'skeleton.jpg',
                                    'stones.jpg', 'trigCalc.jpg', 'vicious.jpg']
                    },
                    {"name" : "Sports",
                     "imageSet" :
                                    ['ali.jpg', 'baseball.jpg', 'basketball.jpg', 'bell.jpg', 
                                    'bike.jpg', 'fans.jpg', 'football.jpg', 'football2.jpg',
                                    'lacross.jpg', 'messi.jpg', 'motorcross.jpg', 'rugby.jpg',
                                    'soccer.jpg', 'tennis.jpg', 'whistle.jpg', 'xbox.jpg']
                    }];

    return imageSets;
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

        //GAME/ANIMALS PAGE
        .state('game.animals',{
            url: '/animals',
            templateUrl: 'views/game.animals.html',
            parent: 'game',
            controller: "GameController"

        })

        //GAME/PLACES PAGE
        .state('game.places',{
            url: '/places',
            templateUrl: 'views/game.places.html',
            parent: 'game',
            controller: "GameController"

        })

        //GAME/SPORTS PAGE
        .state('game.sports',{
            url: '/sports',
            templateUrl: 'views/game.sports.html',
            parent: 'game',
            controller: "GameController"

        })

        //GAME/RANDOM PAGE
        .state('game.random',{
            url: '/random',
            templateUrl: 'views/game.random.html',
            parent: 'game',
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

app.controller('MainController', function($scope, userData) {

    $scope.userData = userData;

    $scope.submit = function(){
        window.location = '#/game';
    }
});

app.controller('GameController', function($scope, userData, imageSets){

    $scope.userData = userData;

    //$scope.userimageSet = [1, 2, 3, 4, 5];

    $scope.userimageSet = $scope.userimageSet || { userimageSet : [] };

    $scope.imageSets = imageSets;

    $scope.addItem = function($event){
        //Uncomment to make sure you are getting the correct img id
        //alert("clicked: " + $event.target.id);

        //set a requirement of 5 images
        if($scope.userimageSet.userimageSet.length == 5){
            alert("Maximun images selected.");
        }else if($.inArray($event.target.id, $scope.userimageSet.userimageSet) == -1){
            //push the image id into the userImageSet
            $scope.userimageSet.userimageSet.push($event.target.id);
        }else{ }
    }

    $scope.removeItem = function($event){
        //retrieve the index of the selected image
        var index = $scope.userimageSet.userimageSet.indexOf($event.target.id);
        
        //remove the element from the userSet
        $scope.userimageSet.userimageSet.splice(index, 1);
    }

    //Fires once the user is trying to commit their image set on Game Page
    $scope.confirmImageSet = function(){
        if($scope.userimageSet.userimageSet.length != 5){
            alert("Must select exactly 5 images.");
        }else{
            //push the imageSet to the db
            //start the game
            //userData.imageSet = $scope.userSet;
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