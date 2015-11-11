var mongoose = require('mongoose');
var userResultsSchema = new mongoose.Schema({
	shownImages: [{ 
		id:{
			type:String,
			required: true
	   	}
	}],
	selected: [{ 
		id: {
			type:String, 
			required: true
	   	}
	}],
	numWrongImgs: { 
		type: Number, 
		default: 0
	},
	submittedDate: {
		type: Date,
		default: Date.now
	}
});

var UserResults = module.exports = mongoose.model('UserResults', userResultsSchema);

module.exports.addUserResults = function(userResults, callback) {
	UserResults.create(userResults, callback);
};
