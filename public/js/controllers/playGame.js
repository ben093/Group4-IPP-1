app.controller('PlayGameController', function($rootScope, $http, $scope, $timeout, userData, gameData) {
	
	//user data variables
    $scope.scp_userData = userData.getUserData();

    //game variables
    $scope.timeRemaining = 10;
    $scope.currentLevel = 1;
    $scope.randomImageSet = [];
    $scope.isClickable = true;
    var timerStarted = false;
    var wrongImgSubtractor = 1;

    //user game data
    $scope.userScore = 0;
	$scope.correctSelections = 0;
    $scope.imageStreak = 0;

    //this is the sqrt factor of the grid meaning
    // curGridFactor squared equals the grid size
    $scope.curGridFactor = 3;

    //variable for re-sizing the images as the set becomes larger
    $scope.newImgSize = "125px";

    //this function will push the user images to the randomSet
    //so that they will appear in the game play grid
    $scope.pushUserImages = function(){
        for(ind = 0; ind < $scope.scp_userData.imageSet.length; ind++){ 
            $scope.randomImageSet.push($scope.scp_userData.imageSet[ind]); 
        }
    }

    $scope.changeSourcesOfSelectedImages = function(){
        var images = document.getElementsByTagName("img");

        for(i = 0;i < images.length;i++){
            var img = images[i];
            var tempJSONObj = {};
            for(q = 0;q < $scope.randomImageSet.length;q++){
                if($scope.randomImageSet[q].pictureName === img.id){
                    tempJSONObj = $scope.randomImageSet[q];
                }
            }

            img.src = tempJSONObj.base64;
        }
    }

    //return the user to the main page if they did not enter any user information
    // this mainly happens because we need the $rootScope.images to be set because the
    // POST call that gets them is ran there
    $scope.checkRootScope = function(){
        if($rootScope.images == undefined){
            window.location = "#/";
        }else{
            $scope.images = $rootScope.images;
            $scope.randomizePictureSet();
        }
    }

	$scope.nextLevel = function(){
		
		//reset all values
		//increment grid factor if level is 4, 7, 10, 13, 16
		//4 -> 4x4
		//7 -> 5x5
		//10-> 6x6
		//13-> 7x7
		//16-> 8x8
		//if curLevel % 3 == 0 up grid factor

        //clear the current random pictures
        $scope.randomImageSet = [];

        //increment the level
        $scope.currentLevel += 1;

        //Change the grid factor and the size of the pictures based on level
        // level logic is explain above
        switch($scope.currentLevel){
            case 4: $scope.curGridFactor += 1;
                    break;
            case 7: $scope.curGridFactor += 1;
                    //$scope.newImgSize = "80px";
                    break;
            case 10: $scope.curGridFactor += 1;
                    //$scope.newImgSize = "80px";
                    break;
            case 13: $scope.curGridFactor += 1;
                    //$scope.newImgSize = "80px";
                    break;
            case 16: $scope.curGridFactor += 1;
                    //$scope.newImgSize = "80px";
                    break;
            case 19: $scope.reviewGame();
                    //$scope.newImgSize = "80px";
                    break;
        }

        //return correct selections to zero for next level
        $scope.correctSelections = 0;

        //reinit the clickable bool
        $scope.isClickable = true;

        //reset the timer
        timerStarted = false;
        $scope.timeRemaining = 10;

        //re-hide the next level button
        var tempNextLevelDOM = document.getElementById('nextLevelBtn');
        tempNextLevelDOM.className += ' hidden';

        //re-hide the grid images of pictures
		var tempGameImagesRowDOM = document.getElementById('gameImagesRow');
        tempGameImagesRowDOM.className += ' hidden';

		//update grid size in the CSS
        //get grid id
        $scope.gridDOM = document.getElementById('flexibleGrid');

        var tempWidth = "";
        tempWidth = ($scope.curGridFactor * 125).toString();
        tempWidth += "px";
        $scope.gridDOM.style.width = tempWidth;

        //re-populate the random pictures with...you guessed it...random pictures
        $scope.randomizePictureSet();

        //reset image sources
        $scope.changeSourcesOfSelectedImages();
	}
	
	//This function will take the selected image event from the front end,
    //and determine if the image is correct or incorrect and take steps
    //based correct/incorrect
    $scope.selectImg = function($event){

        if($scope.isClickable){

            var selectedImage = {
                pictureName: $event.target.id,
                base64: $event.target.src
            };
    		
            //if timer is already started do not create another timer
    		if(timerStarted == false){
    			$scope.startTimer();
    			timerStarted = true;
    		}
    		  
    		//find whether the image is in the imageSet
    		var imageIndexFound = $scope.isSelectionInArray(selectedImage, $scope.scp_userData.imageSet);
    		
            //image was wrong, change the image to a cross
            var tempDOM = document.getElementById($event.target.id);

            //the image is not in the imageSet (wrong image selected)
    		if(imageIndexFound == -1){

                var tempSRC = tempDOM.src.slice(-16);
                //alert(tempSRC);

                if(tempSRC !== "crossmarkBox.png"){
                    $event.target.src = "./views/crossmarkBox.png";
                    $scope.imageStreak = 0;

                    //time is not out
                    if($scope.timeRemaining >= 1){
                        $scope.timeRemaining = $scope.timeRemaining - wrongImgSubtractor;
                    }

                }else{}
                

    		}else if(imageIndexFound != -1){

                var tempSRC = tempDOM.src.slice(-13);
                //alert(tempSRC);

                if(tempSRC !== "checkMark.png"){
                    $event.target.src = "./views/checkMark.png";
                    $scope.correctSelections++;
                    $scope.imageStreak++;
                }else{}
                
            }
            //the image is neither wrong or right (odd case)
            else{
                alert("Error with ImgID: " + $event.target.id);
            }
        }else{}
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

    //This function will randomly select images from the JSON image set
    // to append to the randomImage set
    $scope.randomizePictureSet = function(){
        $scope.usedPair = [];

        var randGroup = "";
        var randIndex = "";
        var pair = "";
        var randomImage = {};

        //add the user images to the random image set
        $scope.pushUserImages();

        while($scope.randomImageSet.length != Math.pow($scope.curGridFactor,2)){
            //set the pair to be empty
            pair = "";

            //find a random group within the bounds
            randGroup = Math.floor((Math.random() * 4));

            //find a random index within the length of the random group
            randIndex = Math.floor((Math.random() * $rootScope.images[randGroup].imageSet.length));

            //set the pair to be the string representation of the group and index number
            pair = randGroup.toString() + randIndex.toString();
            pair = parseInt(pair);

            //check if the pair has been used before by looking in the usedPair array
            //if the pair has not been used
            if($.inArray(pair, $scope.usedPair) == -1){
                //push the random image from the random group into the set
                $scope.usedPair.push(pair);
                randomImage = $rootScope.images[randGroup].imageSet[randIndex];

                //now we need to check and make sure image set is not in the user set
                if($scope.isSelectionInArray(randomImage, $scope.scp_userData.imageSet) == -1){
                    $scope.randomImageSet.push(randomImage);
                }   
            }
        }

        //shuffle the random array so that order is different
        $scope.randomImageSet = $scope.shuffleArray($scope.randomImageSet);
    }

    $scope.onTimeout = function(){

        var timerMsgDOM = document.getElementById('timerMsg');
        
        if($scope.timeRemaining <= 0){

			var gameOverBtnDOM = document.getElementById('gameOverBtn');

            timerMsgDOM.innerHTML = "GAME'S OVER SLOWPOKE!";
			gameOverBtnDOM.className = "btn btn-default";
            $scope.timeRemaining == 0;

            //set the clickable boolean
            $scope.isClickable = false;


        }else if($scope.correctSelections == $scope.scp_userData.imageSet.length){

			var nextLevelBtnDOM = document.getElementById('nextLevelBtn');

			timerMsgDOM.innerHTML = "YOU WIN!";
			nextLevelBtnDOM.className = "btn btn-default";

            //set the clickable boolean
            $scope.isClickable = false;

            $scope.userScore += ($scope.currentLevel * $scope.timeRemaining) + ($scope.imageStreak * 10);

		}
		else{
            timeCheck = $timeout($scope.onTimeout, 1000);
             $scope.timeRemaining--;
        }
    }

	$scope.isSelectionInArray = function(image, imageSet){
		for(var i = 0; i < imageSet.length; i++)
		{
			if(image.pictureName == imageSet[i].pictureName)
			{
				// return the index of the matched image.
				return i;
			}
		}
		
		// return -1 if not found.
		return -1;
	}
	
    $scope.startTimer = function(){

        //set the timer boolean
		timerStarted = true;

		if($scope.scp_userData.imageSet.length == 0){
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

        var tempJSON = {
            name: $scope.scp_userData.name,
            score: $scope.userScore
        };

        var tempGameData = {
            score: $scope.userScore,
            imageStreak: $scope.imageStreak,
            highestLevel: $scope.currentLevel
        };

        gameData.updateGameData(tempGameData);

        $http.post('/api/highScores', tempJSON).success(function(data, response){
            console.log(response);
        });

        window.location = "#/review";
    }

    $scope.sendUserData = function(){
        var postData = userData.getUserData();

        $http.post('/api/user', postData).success(function(data, response){
        });
    }

    $scope.$on("$viewContentLoaded", function(){
        $scope.sendUserData();
    });
});

