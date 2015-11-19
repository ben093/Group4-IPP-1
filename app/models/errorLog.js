var mongoose = require('mongoose');

var errorLogSchema = new mongoose.Schema({
	//the error's message
	message: {
		type: String,
		required: true
	},
	//store the date it occured
	date: {
		type: Date,
		default: Date.now
	}
});

var errorLog = module.exports = mongoose.model('errorLog', errorLogSchema);

//store an error
module.exports.addError = function(err, callback) {
	errorLog.create(err, callback);
};
