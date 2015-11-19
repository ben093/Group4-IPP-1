
var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	//creates an array of userImages, each with its own img_id and category
	userImages: [{ 
		img_id: {
			  type: String,
			  required: true
		},
		category: {
			type: String,
			required:true
		}
	}]
});

var Images = module.exports = mongoose.model('Images', imageSchema);

// get images
module.exports.getImages = function(callback, limit) {
	Images.find(callback).limit(limit);
};
