app.controller('MainController', function($rootScope, $scope, $http, userData) {

    $scope.userData = userData.getUserData();

    //get the images from the back end
    $scope.getData = function(){
        //GET request for the images
        $http.get('/api/images').success(function(data, response){
            //
            $rootScope.images = data;

            //re-enable the submit button when the images hae been retrieved from the database
            document.getElementById('submitBtn').disabled = false;
        });

        //GET request for the high scores
        $http.get('/api/highScores').success(function(data, response){
            //
            $rootScope._highScores = data;

            console.log(data);
        });
    }

    //Run the getImages function after the entire page loads. This is key. 
    // This will be the only time that the images is retrieved from the database
    // because when I did it during the game page and the play game page
    // it was slow and tedious, this is a lot better. Trust me.
    $scope.$on("$viewContentLoaded", function(){
        //images have NOT been populated yet
        if($rootScope.images == null){
            $scope.getData();
        }else{ //images HAVE been populated
            //re-enable the submit button when the iamges hae been retrieved from the database
            document.getElementById('submitBtn').disabled = false;
        }
    });

    $scope.submit = function(){
        window.location = '#/game/animals';
    }
});

