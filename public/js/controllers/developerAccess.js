app.controller('DeveloperController', function($scope, $http){
	$scope.ctrlName = "DeveloperController";
	$scope.confirmMsg = "";

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
	        } 
        	FR.readAsDataURL( this.files[0] );
    	}
	}

	$scope.upload = function(){
		//return a confirm msg
		$scope.confirmMsg = "Successful upload";

		//re-init the image src to nothing
		$("#inputImg").attr("src", "");
	}

	$("#inputFile").change($scope.readImage);
});