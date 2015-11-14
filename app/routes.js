// app/routes.js

var path = require('path');
var fs   = require('fs');

module.exports = function(app) {
	
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname , '../public','views/index.html')); // load our public/index.html file
	});

	//only for developer access
	app.get('/developerAccess', function(req, res){
		res.sendFile(path.join(__dirname, '../public', 'views/dev.html'));
	});

	app.get('/api/images', function(req, res) {
		Images.getImages(function(err, images) {
			if (err) {
				throw err;
			}
			res.json(images);
		});
	});

	app.get('/api/highScores', function(req, res) { // 29:00
		HighScores.getHighScores(function(err, hScores) {
			if (err) {
				throw err;
			}
			res.json(hScores);
		});
	});
	app.post('/api/highScores', function(req, res) { // 41:30 https://www.youtube.com/watch?v=eB9Fq9I5ocs
		var hScore = req.body;		
		HighScores.addHighScore(hScore, function(err, hScore) {
			if (err) {
				throw err;
			}
			res.json(hScore);
		});
	});
};


