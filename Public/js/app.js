// public/js/app.js
angular.module('QuickSight', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

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

routerApp.controller('MainController', function($scope) {
    $scope.tagline = "MainControl";
});

routerApp.controller('GameController', function($scope) {
    $scope.tagline = "GameControl";

    $scope.imageSetOne = ["bear.jpg", "camera.jpg", "circuitBoard.jpg", "donut.jpg", "earth.gif"];
    $scope.imageSetTwo = ["fried_egg.jpg", "jackolantern.jpg", "leatherChair.jpg", "trigCalc.jpg"];
    $scope.imageSetThree = ["math.jpg", "poker.jpg", "retroCar.jpg", "rose.jpg", "stones.jpg"];
    $scope.imageSetFour = ["sailboat.jpg"];

    $scope.imageGroup = [$scope.imageSetOne, 
                          $scope.imageSetTwo, 
                          $scope.imageSetThree, 
                          $scope.imageSetFour];
});

routerApp.controller('InfoController', function($scope) {
    $scope.tagline = "InfoControl";
});

routerApp.controller('HscoresController', function($scope) {
    $scope.tagline = "HscoresControl";
});