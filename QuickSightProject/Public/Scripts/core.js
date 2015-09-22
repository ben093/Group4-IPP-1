//public/Scrpts/core.js

var app = angular.module('QuickSight', []);

app.controller('mainController', function($scope, $http) {
    
    $scope.testText = "Press the button!";

    $scope.changeText = function () {
        $scope.testText = "Pressed";
    };
});

app.controller('hscoresController', function ($scope, $http) {

    $scope.highscoresTESTONLY = [
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
