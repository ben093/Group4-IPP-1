<<<<<<< HEAD
﻿//public/core.js

var app = angular.module('QuickSight', []);
=======
﻿//public/Scrpts/core.js

var app = angular.module('QuickSight', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
        templateUrl: 'index.html',
        controller: 'mainController'
    })
        .when('/info', {
        templateUrl: 'info.html',
        controller: 'infoController'
    })
        .when('/hscores', {
        templateUrl: 'hscores.html',
        controller: 'hscoresController'
    });
});
>>>>>>> ed0e3b75303a5519cc924b5ca7b769d31e30dc71

app.controller('mainController', function ($scope, $http) {
    
    $scope.userData = { name: '', age: '', gender: '' };
    $scope.users = [];

    $scope.sendPost = function () {
        users.push($scope.userData);
        userData = { name: '', age: '', gender: '' };
    };
<<<<<<< HEAD
});

app.controller('gameController', function ($scope, $http) {
    $scope.imageGroup = [["./Views/imageSet/bear.jpg", "./Views/imageSet/camera.jpg",
                          "./Views/imageSet/circuitBoard.jpg", "./Views/imageSet/donut.jpg", 
                          "./Views/imageSet/earth.gif"],[ "./Views/imageSet/jackolantern.jpg", 
                          "./Views/imageSet/math.jpg", "./Views/imageSet/poker.jpg",
                          "./Views/imageSet/rose.jpg", "./Views/imageSet/trigCalc.jpg"]];
=======

    
>>>>>>> ed0e3b75303a5519cc924b5ca7b769d31e30dc71
});

app.controller('hscoresController', function ($scope, $http) {

    $scope.highscoresTESTONLY = [
<<<<<<< HEAD
        { name: 'NAME', score:'SCORE'},
=======
>>>>>>> ed0e3b75303a5519cc924b5ca7b769d31e30dc71
        { name: 'Samuel', score: '102033' },
        { name: 'John', score: '75483' },
        { name: 'Ashley', score: '23984' },
        { name: 'Zeus', score: '1293845' },
        { name: 'Ironman', score: '2384958' },
        { name: 'Tupac', score: '128345' }
    ];
});

app.controller('infoController', function ($scope, $http) {
    
<<<<<<< HEAD
=======
    $scope.text = "THIS";

>>>>>>> ed0e3b75303a5519cc924b5ca7b769d31e30dc71
    $scope.developers = [
        { name: 'Casey' },
        { name: 'Ben' },
        { name: 'Anthony' },
        { name: 'Spencer' },
        { name: 'Zach' }
    ];
});
