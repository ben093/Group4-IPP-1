
﻿//public/core.js
var app = angular.module('QuickSight', []);


app.controller('mainController', function ($scope, $http) {
    
    $scope.userData = { name: '', age: '', gender: '' };
    $scope.users = [];

    $scope.sendPost = function () {
        users.push($scope.userData);
        userData = { name: '', age: '', gender: '' };
    };
});

app.controller('gameController', function ($scope, $http) {
    $scope.imageGroup = [["./Views/imageSet/bear.jpg", "./Views/imageSet/camera.jpg",
                          "./Views/imageSet/circuitBoard.jpg", "./Views/imageSet/donut.jpg", 
                          "./Views/imageSet/earth.gif"],[ "./Views/imageSet/jackolantern.jpg", 
                          "./Views/imageSet/math.jpg", "./Views/imageSet/poker.jpg",
                          "./Views/imageSet/rose.jpg", "./Views/imageSet/trigCalc.jpg"]];
});

app.controller('hscoresController', function ($scope, $http) {

    $scope.highscoresTESTONLY = [
        { name: 'NAME', score:'SCORE'},
        { name: 'Samuel', score: '102033' },
        { name: 'John', score: '75483' },
        { name: 'Ashley', score: '23984' },
        { name: 'Zeus', score: '1293845' },
        { name: 'Ironman', score: '2384958' },
        { name: 'Tupac', score: '128345' }
    ];
});

app.controller('infoController', function ($scope, $http) {
    $scope.developers = [
        { name: 'Casey' },
        { name: 'Ben' },
        { name: 'Anthony' },
        { name: 'Spencer' },
        { name: 'Zach' }
    ];
});
