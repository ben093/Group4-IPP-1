app.controller('GameController', function($scope, $http, userData, imageSets){

    //copy the userData over for use
    $scope.userData = userData;

    //this handles the parent and child image selection because of the doubly nested ui-view
    $scope.userimageSet = $scope.userimageSet || { userimageSet : [] };

    //copy the imageSets for use
    $scope.imageSets = imageSets;

    //redundant code
    //$scope.userData.imageSet = $scope.userimageSet.userimageSet;

    //Send POST request with name,age,gender, and image selection set
    $scope.sendPOST = function(){

        //create a json object to send
        var postData = ({
                name: $scope.userData.name,
                age:  $scope.userData.age,
                gender: $scope.userData.gender,
                imageSet: $scope.userimageSet
        });

        //send the POST
        $http.post('/api/user', postData).success(function(data, response){
            console.log(response);
        });
    }

    //fires once the user clicks an img to add to their selection
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

    //fires once the user is trying to remove an image from their selection
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
            //push the imageSet to the db via POST request
            //start the game
            //userData.imageSet = $scope.userSet;
            $scope.sendPOST();  
            window.location = '#/play';
        }
    }
});

