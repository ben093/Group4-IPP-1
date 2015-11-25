app.controller('DeveloperController', function($scope, $http){
	$scope.ctrlName = "DeveloperController";
	$scope.confirmMsg = "";

	$scope.images = {};

	$scope.newImage = {
		category: "",
		fileName: "",
		img_id: ""
	};

	$scope.init = function(){
		//GET request for the images
		$http.get('/api/images').success(function(data, response){
			$scope.images = data;
		});
	}

	//this function reads an image into a filereader while
	// also base 64 encoding the image so that it may enter to mongoDB
	// the resulting base64 encoded string is the "e.target.result"
	$scope.readImage = function() {
    if ( this.files && this.files[0] ) {
	        var FR = new FileReader();   
	        FR.onload = function(e){
	        	//Uncomment to see the raw string attached to the id="base" element
	        	//$("#base").text(e.target.result);
	        	$("#inputImg").attr ("src", e.target.result);
	        	$scope.newImage.img_id = e.target.result;
	        	$scope.newImage.fileName = FR.fileName;
	        	$("#inputFile").each(function() {
    				$scope.newImage.fileName = $(this).val().split('/').pop().split('\\').pop();
				});
	        } 
        	FR.readAsDataURL( this.files[0] );
    	}
	}

	$scope.upload = function(){

		//send the POST
        $http.post('/developerAccess', $scope.newImage).success(function(response){
            if(response == 200){ //success code
            	//return a confirm msg
				$scope.confirmMsg = "Successful upload";
            }else{
            	$scope.confirmMsg = "Error code: " + response;
            }
        });

		//re-init the image src to nothing
		$("#inputImg").attr("src", "");
	}

	$("#inputFile").change($scope.readImage);
	$scope.init();
});