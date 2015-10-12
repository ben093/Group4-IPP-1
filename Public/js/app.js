// public/js/app.js
var app = angular.module('QuickSight', ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: "MainController"
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('game', {
            url: '/game',
            templateUrl: 'views/game.html',
            controller: "GameController"
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('hscores', {
            url: '/hscores',
            templateUrl: 'views/hscores.html',
            controller: "HscoresController"
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('info', {
            url: '/info',
            templateUrl: 'views/info.html',
            controller: "InfoController"
        }); 
});

app.controller('MainController', function($scope) {
    $scope.tagline = "MainControl";

    $scope.submit = function(){
        window.location = "#/game";
    }
});

app.controller('GameController', function($scope) {

    $scope.userSet = [];

    $scope.addItem = function(event){

        //Uncomment to make sure you are getting the correct img id
        //alert("clicked: " + event.target.id);

        if($scope.userSet.length == 5){
            alert("Maximun images selected.");
        }else{
            //push the image id into the userSet
            $scope.userSet.push(event.target.id);
        }
    }

    $scope.tagline = "GameControl";

    

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