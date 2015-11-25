var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	category: {
		type: String,
		required: true
	},
	imageSet: [{
		pictureName:{
			type: String,
			required: true,
		},
		base64:{
			type: String,
			required: true
		}
	}]
});

var Images = module.exports = mongoose.model('Images', imageSchema);

// get images
module.exports.getImages = function(callback) {
	Images.find(callback);
};

//add new image
module.exports.addImage = function(newImage, callback){

	var collection = Images.find({"category": newImage.category});
	var query = {"category": newImage.category};
	var update = {};

	if(collection){ //category is found
		//assign update to the appropiate value
		update = { $addToSet: 
			{ "imageSet": 
				{   
					pictureName: newImage.fileName, 
					base64: newImage.img_id 
				} 
			} 
		};

		//update the existing category but adding the newImage.img_id to the set
		Images.update(query, update, callback);
	}else{ //collection not found
		//assign update to the appropiate value
		update = {"imageSet": [newImage.imgName, newImage.img_id]};

		//create a new category with the newImage.img_id in the imageSet
		Images.create(query, update, callback);
	}
};
