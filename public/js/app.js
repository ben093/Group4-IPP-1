// public/js/app.js
var app = angular.module('QuickSight', ['ui.router'])

//function that will handle the routing of the front end
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

        //REVIEW GAME PAGE
        .state('reviewGame',{
            url: '/review',
            templateUrl: 'views/reviewGame.html',
            controller: "ReviewGameController"
        })
        
        //INFO PAGE
        .state('info', {
            url: '/info',
            templateUrl: 'views/info.html',
            controller: "InfoController"
        }); 
});
