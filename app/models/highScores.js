var mongoose = require('mongoose');

var highScoresSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	rank: {
		type: Number,
		min: 1,
		max: 10,
	},
	score: {
		type: Number,
		required:true
	}
});

var HighScores = module.exports = mongoose.model('HighScores', highScoresSchema, "highScores");

module.exports.getHighScores = function(callback) {
	HighScores.find().sort({score:-1}).exec(callback);
};

// add high Score
module.exports.addHighScore = function(hScore, callback) {
	HighScores.create(hScore, callback);
};
