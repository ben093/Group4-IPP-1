app.controller('DeveloperController', function($scope, $http){
	$scope.ctrlName = "DeveloperController";

	$scope.readImage = function() {
    if ( this.files && this.files[0] ) {
	        var FR = new FileReader();   
	        FR.onload = function(e){
	        	$("#base").text(e.target.result);
	        	$("#inputImg").attr ("src", e.target.result);
	        } 
        	FR.readAsDataURL( this.files[0] );

        	$scope.ctrlName = this.files[0];
    	}
	}

	$("#inputFile").change($scope.readImage);
});