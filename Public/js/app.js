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

app.factory("gameData", function(){
    return { score: 0, correctSelections : 0, imageStreak: 0 };
});

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
            $scope.userimageSet.userimageSet.push($event.target.id.trim());
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

app.controller('PlayGameController', function($scope, $timeout, userData, imageSets, gameData) {
	
	//user data variables
    $scope.userStuff = userData;
    $scope.userImageSet = userData.imageSet;

    //game variables
    $scope.timeRemaining = 10;
    $scope.currentLevel = 1;
    $scope.wrongImgSubtractor = 1;
    $scope.randomImageSet = [];
    $scope.timerStarted = false;

    //user game data
    $scope.userScore = 0;
	$scope.correctSelections = 0;
    $scope.imageStreak = 0;

     //this is the sqrt factor of the grid meaning
    // curGridFactor squared equals the grid size
    $scope.curGridFactor = 3;

    //will hold the selected images that 
    // the user selects during the game stage
    $scope.userSelectedImages = [];

    //push the user images to the randomSet
    for(ind = 0;ind < $scope.userStuff.imageSet.length;ind++){ 
        $scope.randomImageSet.push($scope.userStuff.imageSet[ind]); 
    }
	
	$scope.nextLevel = function(){
		
		if($scope.currentLevel == 18){
			//max level finished
		}else{
			//reset all values
			//increment grid factor if level is 4, 7, 10, 13, 16
			//4 -> 4x4
			//7 -> 5x5
			//10-> 6x6
			//13-> 7x7
			//16-> 8x8
			//if curLevel % 3 == 0 up grid factor

            //Change the grid factor based on level
            // level logic is explain above
            // if( $scope.currentLevel == 4  || $scope.currentLevel == 7  ||
            //     $scope.currentLevel == 10 || $scope.currentLevel == 13 ||
            //     $scope.currentLevel == 13 || $scope.currentLevel == 16){

            //     $scope.curGridFactor += 1;
            // }

            //ONLY FOR TESTING
            $scope.curGridFactor += 1;


            //increment the level
			$scope.currentLevel += 1;

            //return correct selections to zero for next level
            $scope.correctSelections = 0;

            //reset the timer
            $scope.timerStarted = false;

            //re-hide the next level button
            var tempNextLevelDOM = document.getElementById('nextLevelBtn');
            tempNextLevelDOM.className += ' hidden';

            //re-hide the grid images of pictures
			var tempGameImagesRowDOM = document.getElementById('gameImagesRow');
            //tempGameImagesRowDOM.className += ' hidden';

			//update grid size in the CSS
            //get grid id
            $scope.gridDOM = document.getElementById('flexibleGrid');

            var tempWidth = "";
            tempWidth = ($scope.curGridFactor * 125).toString();
            tempWidth += "px";
			$scope.gridDOM.style.width = tempWidth;

            alert(tempWidth);

            //TESTING ONLY
            //remove comments to see the current grid factor
            //alert($scope.curGridFactor);

            //clear the current random pictures
            $scope.randomImageSet = [];

            //re-initialize the userStuff.imageSet via re-copying the original 
            // userData.imageSet via the saved userImageSet
            $scope.userStuff.imageSet = $scope.userImageSet;

            //re-insert the user images into the random image set
            for(ind = 0;ind < $scope.userStuff.imageSet.length;ind++){ 
                $scope.randomImageSet.push($scope.userStuff.imageSet[ind]); 
            }

            //re-populate the random pictures with...you guessed it...random pictures
			$scope.randomizePictureSet();
		}
	}
	
	//logic for when a user selects an image during the game state
    $scope.selectImg = function($event){
		
        //if timer is already started do not create another timer
		if($scope.timerStarted == false){
			$scope.startTimer();
			$scope.timerStarted = true;
		}
		
        //the image is not in the imageSet (wrong image selected)
        if($.inArray($event.target.id.trim(),$scope.userStuff.imageSet) == -1){
            if($scope.timeRemaining >= 1){
                $scope.timeRemaining = $scope.timeRemaining - $scope.wrongImgSubtractor;
            }
            var tempDOM = document.getElementById($event.target.id);
            tempDOM.src = "./Views/crossmarkBox.png";
            $scope.imageStreak = 0;
        //the image is in the image set (correct image selected)
        }else if($.inArray($event.target.id.trim(),$scope.userStuff.imageSet) != -1){
            var tempDOM = document.getElementById($event.target.id);
            tempDOM.src = "./Views/checkMark.png";
			$scope.correctSelections++;
            $scope.imageStreak++;
        }
        //the image is neither wrong or right (odd case)
        else{
            alert($event.target.id);
        }
    }

	//shuffle the random array
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

    //Returns the complete grid size which is the grid factor ^ 2
    $scope.getGridFactor = function(){
        return new Array(Math.pow($scope.curGridFactor,2));
    }

    //This function will randomly select images from the JSON image set
    // to append to the randomImage set
    $scope.randomizePictureSet = function(){
        $scope.usedPair = [];

        while($scope.randomImageSet.length != Math.pow($scope.curGridFactor,2)){
            //set the pair to be empty
            var pair = "";

            //find a random group within the bounds
            var randGroup = Math.floor((Math.random() * 4));

            //find a random index within the length of the random group
            var randIndex = Math.floor((Math.random() * imageSets[randGroup].imageSet.length));

            //set the pair to be the string representation of the group and index number
            pair = randGroup.toString() + randIndex.toString();
            pair = parseInt(pair);

            //check if the pair has been used before by looking in the userPair array
            //if the pair has not been used
            if($.inArray(pair, $scope.usedPair) == -1){
                //push the random image from the random group into the set
                $scope.usedPair.push(pair);
                var name = imageSets[randGroup].name + "/" + imageSets[randGroup].imageSet[randIndex];

                //now we need to check and make sure image set is not in the user set
                if($.inArray(name, $scope.userImageSet) == -1){
                    $scope.randomImageSet.push(name);
                }   
            }
        }

        //shuffle the random array so that order is different
        $scope.randomImageSet = $scope.shuffleArray($scope.randomImageSet);
    }

    $scope.onTimeout = function(){
        
        if($scope.timeRemaining <= 0){
			var timerMsgDOM = document.getElementById('timerMsg');
			var gameOverBtnDOM = document.getElementById('gameOverBtn');
            timerMsgDOM.innerHTML = "GAME'S OVER SLOWPOKE!";
			gameOverBtnDOM.className = "btn btn-default";
            $scope.timeRemaining == 0;
        }else if($scope.correctSelections == $scope.userStuff.imageSet.length){
			var timerMsgDOM = document.getElementById('timerMsg');
			var nextLevelBtnDOM = document.getElementById('nextLevelBtn');
			timerMsgDOM.innerHTML = "YOU WIN!";
			nextLevelBtnDOM.className = "btn btn-default";

            //need to add the image streak functionality before it gets
            // factored into the score
            $scope.userScore += ($scope.currentLevel * $scope.timeRemaining) + ($scope.imageStreak * 10);


			//$scope.timeRemaining = $scope.timeRemaining;
		}
		else{
            timeCheck = $timeout($scope.onTimeout, 1000);
             $scope.timeRemaining--;
        }
    }

    $scope.startTimer = function(){

        //set the timer boolean
		$scope.timerStarted = true;

		if($scope.userStuff.imageSet.length == 0){
			//redirect to game page to select image set
			window.location = '#/game/animals';
		}else{
			var timeCheck = $timeout($scope.onTimeout,1000);
			var tempDOM = document.getElementById("gameImagesRow");
			tempDOM.className = "row";
		}
    }

    //go to the review game page
    $scope.reviewGame = function(){
        window.location = "#/review";
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

    //need to do a POST request to get the highscores data

    $scope.highscores = [{name: "Zeus", score: "988,234,453"},
                         {name: "Obama",score: "22,234,363"},
                         {name: "Beetlejuice", score: "2,838,472"},
                         {name: "Anthony", score: "-22"}];
});

app.controller("ReviewGameController", function($scope, gameData, userData){    
    $scope.userData = userData;
    $scope.gameData = gameData;
});