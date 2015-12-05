app.controller('GameController', function($rootScope, $scope, $http, userData){

    //copy the userData over for use
    $scope.scp_userData = userData.getUserData();

    //this handles the parent and child image selection because of the doubly nested ui-view
    $scope.scp_userData.imageSet = $scope.scp_userData.imageSet || { imageSet : [] };

    //get the current imageSet
    $scope.images = $rootScope.images;

    //Send POST request with name,age,gender, and image selection set
    $scope.setUserData = function(){

        //create a json object to send
        var postData = ({
                name: $scope.scp_userData.name,
                age:  $scope.scp_userData.age,
                gender: $scope.scp_userData.gender,
                imageSet: $scope.scp_userData.imageSet
        });

        userData.setUserData(postData);

        //send the POST request with the User Data
        $http.post("/api/user", postData).success(function(response){
            console.log(response);
        });
    }

    //checks to see if the image is in the imageSet, returns -1 is no, 1 if yes
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

    //fires once the user clicks an img to add to their selection
    $scope.addItem = function($event){
        //Uncomment to get alerts for different parts of the event.target
        //Used mainly for testing purposes
        //alert("clicked: " + $event.target.src);

        //assign the fields of the temp JSON object
        var selectedImage = {
            pictureName : $event.target.id,
            base64: $event.target.src
        };

        //set a requirement of 5 images on the user
        if($scope.scp_userData.imageSet.length == 5){
            alert("Maximun images selected.");
        }else if($scope.isSelectionInArray(selectedImage, $scope.scp_userData.imageSet) == -1){
            //push the image id into the userImageSet
            $scope.scp_userData.imageSet.push(selectedImage);
        }else{ }
    }

    //fires once the user is trying to remove an image from their selection
    $scope.removeItem = function($event){

        //create a selected JSON obj
        $scope.selectedImage = {
            pictureName: $event.target.id,
            base64: $event.target.src
        }

        //retrieve the index of the selected image
        var index = $scope.isSelectionInArray($scope.selectedImage, $scope.scp_userData.imageSet);
        
        //remove the element from the userSet
        $scope.scp_userData.imageSet.splice(index, 1);
    }

    //Fires once the user is trying to commit their image set on Game Page
    $scope.confirmImageSet = function(){
        if($scope.scp_userData.imageSet.length != 5){
            alert("Must select exactly 5 images.");
        }else{
            //push the imageSet to the db via POST request
            //start the game
            $scope.setUserData();
            window.location = '#/play';
        }
    }
});

