app.controller('MainController', function($scope, $http, userData) {

    $scope.userData = userData.getUserData();

    //Send POST request with name,age,gender, and image selection set
    // $scope.sendPOST = function(){

    //     //create a json object to send
    //     var postData = ({
    //             name: $scope.userData.name,
    //             age:  $scope.userData.age,
    //             gender: $scope.userData.gender   
    //     });

    //     //send the POST
    //     $http.post("/api/user", postData).success(function(postData, response){
    //         console.log(response);
    //         $scope.postData = response;
    //     });
    // }

    $scope.submit = function(){
    	//$scope.sendPOST();
        window.location = '#/game/animals';
    }
});

