var mongoose = require('mongoose');

//I feel that we shouldn't do a userResult AND a userData but just modify the user collection
//if they finish the game
var userDataSchema = new mongoose.Schema({
	name:{
		type:String,
		required: false
	},
	age:{
		type:Number,
		max: 120,
		min: 0,
		required: false,
		default: 0
	},
	gender:{
		type:String,
		required: false,
		default: "Unknown"
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
	}],
	submittedDate: {
		type: Date,
		default: Date.now
	}
});

var UserData = module.exports = mongoose.model('UserData', userDataSchema);

module.exports.addUserData = function(userData, callback) {
	UserData.create(userData, callback);
};
