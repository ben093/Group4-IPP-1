app.controller('PlayGameController', function($rootScope, $scope, $timeout, userData, gameData) {
	
	//user data variables
    $scope.scp_userData = userData.getUserData();

    //game variables
    $scope.timeRemaining = 10;
    $scope.currentLevel = 1;
    $scope.randomImageSet = [];
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

    //will hold the selected images that 
    // the user selects during the game stage
    $scope.userSelectedImages = [];

    //this function will push the user images to the randomSet
    //so that they will appear in the game play grid
    $scope.pushUserImages = function(){
        for(ind = 0; ind < $scope.scp_userData.imageSet.length; ind++){ 
            $scope.randomImageSet.push($scope.scp_userData.imageSet[ind]); 
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

            //clear the current random pictures
            $scope.randomImageSet = [];

            //re-initialize the userData.imageSet via re-copying the original 
            // userData.imageSet via the saved scp_userData.imageSet
            //$scope.scp_userData.imageSet = $scope.scp_userData.imageSet;

            //Change the grid factor and the size of the pictures based on level
            // level logic is explain above
            // switch($scope.currentLevel){
            //     case 4:
            //     case 7:
            //     case 10:
            //     case 13:
            //     case 16:
            // }

            $scope.newImgSize = "80px";

            //ONLY FOR TESTING
            $scope.curGridFactor += 1;

            //increment the level
			$scope.currentLevel += 1;

            //return correct selections to zero for next level
            $scope.correctSelections = 0;

            //reset the timer
            timerStarted = false;

            //re-hide the next level button
            var tempNextLevelDOM = document.getElementById('nextLevelBtn');
            // tempNextLevelDOM.className += ' hidden';

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

            //re-populate the random pictures with...you guessed it...random pictures
            $scope.randomizePictureSet();
		}
	}
	
	//This function will take the selected image event from the front end,
    //and determine if the image is correct or incorrect and take steps
    //based correct/incorrect
    $scope.selectImg = function($event){

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
		  
        //the image is not in the imageSet (wrong image selected)
		if(imageIndexFound == -1){
            //time is out
            if($scope.timeRemaining >= 1){
                $scope.timeRemaining = $scope.timeRemaining - wrongImgSubtractor;
            }

            //image was wrong, change the image to a cross
            var tempDOM = document.getElementById($event.target.id);
            $event.target.src = "./Views/crossmarkBox.png";
            $scope.imageStreak = 0;

		}else if(imageIndexFound != -1){
            //image was correct, change the image to a checkmark
            var tempDOM = document.getElementById($event.target.id);
            $event.target.src = "./Views/checkMark.png";
			$scope.correctSelections++;
            $scope.imageStreak++;
        }
        //the image is neither wrong or right (odd case)
        else{
            alert("Error with ImgID: " + $event.target.id);
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
    // Commented because I'm not sure if this function is still being used
    // $scope.getGridFactor = function(){
    //     return new Array(Math.pow(curGridFactor,2));
    // }

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
        }else if($scope.correctSelections == $scope.scp_userData.imageSet.length){
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
        window.location = "#/review";
    }
});

