// public/js/app.js
var app = angular.module('QuickSight', ['ui.router'])

app.factory("userData", function(){
    return { name: "", age: "", gender: "" };
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
            controller: "GameController"
        })
        
        //INFO PAGE
        .state('info', {
            url: '/info',
            templateUrl: 'views/info.html',
            controller: "InfoController"
        }); 
});

app.controller('MainController', function($scope, userData) {
    $scope.tagline = "MainControl";

    $scope.userData = userData;

    $scope.submit = function(){
        window.location = "#/game";
    }
});

app.controller('GameController', function($scope, userData) {

    $scope.userSet = [];

    $scope.userData = userData;

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


    $scope.imageSetOne = ["./Views/imageSet/bear.jpg", 
                            "./Views/imageSet/camera.jpg", 
                            "./Views/imageSet/circuitBoard.jpg"];

    $scope.imageSetTwo = ["./Views/imageSet/fried_egg.jpg", 
                            "./Views/imageSet/jackolantern.jpg", 
                            "./Views/imageSet/leatherChair.jpg"];

    $scope.imageSetThree = ["./Views/imageSet/math.jpg", 
                            "./Views/imageSet/poker.jpg", 
                            "./Views/imageSet/retroCar.jpg"];

    $scope.imageSetFour = [ "./Views/imageSet/donut.jpg", 
                            "./Views/imageSet/earth.gif",
                            "./Views/imageSet/stones.jpg"];

    $scope.imageSetFive = [ "./Views/imageSet/trigCalc.jpg",
                            "./Views/imageSet/rose.jpg",
                            "./Views/imageSet/sailboat.jpg"];


    $scope.imageGroup = [$scope.imageSetOne, 
                          $scope.imageSetTwo, 
                          $scope.imageSetThree,
                          $scope.imageSetFour,
                          $scope.imageSetFive];

    //Fires once the user is trying to commit their image set on Game Page
    $scope.confirmImageSet = function(){
        if($scope.userSet.length != 5){
            alert("Must select exactly 5 images.");
        }else{
            //push the imageSet to the db
            //start the game
            window.location = '#/play';
        }
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
});