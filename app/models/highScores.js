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
		required: true
	},
	score: {
		type: Number,
		required:true
	}
});

var HighScores = module.exports = mongoose.model('HighScores', highScoresSchema);

// get images
module.exports.getHighScores = function(callback) {
	HighScores.find(callback);
};

// add high Score
module.exports.addHighScore = function(hScore, callback) {

	//get the current high scores in order of lowest rank integer to highest rank integer
	var curHighScores = HighScore.find().sort({rank: 1});

	//IDEAS:
	//1. Put the new hscores into curHighScores, sort, re-rank, then remove the last element
	//2. Write an algorithm to check the highscores, insert highscores, re-order the rest 
	HighScores.create(hScore, callback);
};
