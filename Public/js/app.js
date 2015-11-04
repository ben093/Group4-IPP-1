// public/js/app.js
var app = angular.module('QuickSight', ['ui.router'])

app.factory("userData", function(){
    return { name: "Person who forgot their own name", age: "Lazy-years-old", gender: "Unicorn", imageSet: []};
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
        window.location = '#/game/animals';
    }
});

app.controller('GameController', function($scope, userData, imageSets){

    $scope.userData = userData;

    $scope.userimageSet = $scope.userimageSet || { userimageSet : [] };

    $scope.imageSets = imageSets;

    $scope.userData.imageSet = $scope.userimageSet.userimageSet;

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

app.controller('PlayGameController', function($scope, $timeout, userData, imageSets) {

    $scope.userStuff = userData;

    $scope.timeRemaining = 10;

    $scope.userScore = 0;

    $scope.currentLevel = 1;

    $scope.wrongImgSubtractor = 1;

     //this is the sqrt factor of the grid meaning
    // curGridFactor squared equals the grid size
    $scope.curGridFactor = 3;

    $scope.randomImageSet = [];

    $scope.usedPair = [];

    //will hold the selected images that 
    // the user selects during the game stage
    $scope.userSelectedImages = [];

    //get grid id
    $scope.gridDOM = angular.element(document.getElementById('flexibleGrid'));

    //initialize the grid to a starter size of a 3 x 3 which is 300px in width
    //since each image is 100x100px
    $scope.gridDOM.css('width', "375px");

    //change the grid style's during the game stage
    $scope.changeGridStyle = function(n){
        $scope.gridDOM.css('width', String.valueOf(n) + "px");
    }

    //push the user images
    for(ind = 0;ind < $scope.userStuff.imageSet.length;ind++){ 
        $scope.randomImageSet.push($scope.userStuff.imageSet[ind]); 
    }

    $scope.selectImg = function($event){

        alert($event.target.id);
        if($.inArray($scope.userStuff.imageSet, $event.target.id) == -1){
            if($scope.timeRemaining > 1){
                $scope.timeRemaining = $scope.timeRemaining - $scope.wrongImgSubtractor;
            }
            var tempDOM = document.getElementById($event.target.id);
            tempDOM.src = "./Views/crossmarkBox.png";
        }else if($.inArray($scope.userStuff.imageSet, $event.target.id) != -1){
            var tempDOM = document.getElementById($event.target.id);
            tempDOM.src = "./Views/checkMark.png";
        }else{}
    }


    $scope.shuffleArray = function(arrayInput){
        var input = arrayInput;
     
        for (var i = input.length-1; i >=0; i--) {
         
            var randomIndex = Math.floor(Math.random()*(i+1)); 
            var itemAtIndex = input[randomIndex]; 
             
            input[randomIndex] = input[i]; 
            input[i] = itemAtIndex;
        }

        return input;
    }

    $scope.getGridFactor = function(){
        return new Array(Math.pow($scope.curGridFactor,2));
    }

    $scope.getArray = function(n){
        return new Array(n);
    }

    $scope.randomizePictureSet = function(){

        var pair = "";

        while($scope.randomImageSet.length != Math.pow($scope.curGridFactor,2)){
            //
            var randGroup = Math.floor((Math.random() * 4));

            //
            var randIndex = Math.floor((Math.random() * imageSets[randGroup].imageSet.length));

            pair = randGroup.toString() + randIndex.toString();


            if($.inArray(pair, $scope.usedPair) == -1){
                //push the random image from the random group into the set
                $scope.usedPair.push(pair);
                var name = imageSets[randGroup].name + "/" + imageSets[randGroup].imageSet[randIndex];
                $scope.randomImageSet.push(name);
            }
        }

        $scope.randomImageSet = $scope.shuffleArray($scope.randomImageSet);
    }

    $scope.onTimeout = function(){
        
        if($scope.timeRemaining <= 0){
            var tempDOM = document.getElementById('timerMsg');
            tempDOM.innerHTML = "GAME'S OVER SLOWPOKE!";
            $scope.timeRemaining == 0;
        }else{
            timeCheck = $timeout($scope.onTimeout, 1000);
             $scope.timeRemaining--;
        }
    }

    $scope.startTimer = function(){
        var timeCheck = $timeout($scope.onTimeout,1000);
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