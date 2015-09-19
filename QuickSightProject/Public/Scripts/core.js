//public/Scrpts/core.js

var app = angular.module('QuickSight', []);

app.controller('mainController', function($scope, $http) {
    
    $scope.testText = "Press the button!";

    $scope.changeText = function () {
        $scope.testText = "Pressed";
    };
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
