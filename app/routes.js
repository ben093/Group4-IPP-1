// app/routes.js

var path = require('path');
var fs   = require('fs');

//need to require each model from model.js
UserData = require('./models/userData.js');
Images 	 = require('./models/image.js');
HighScores = require('./models/highScores.js');
ErrorLog = require('./models/errorLog.js');

module.exports = function(app) {

	////   GET REQUESTS    ////
	//GET request the returns the base layer of the web front end
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname , '../public','views/index.html')); // load our public/index.html file
	});

	//only for developer access
	//will eventually be the portal for the database access
	// and adding pictures to the picture set
	app.get('/developerAccess', function(req, res){
		res.sendFile(path.join(__dirname, '../public', 'views/dev.html'));
	});

	//GET request to get the current images
	app.get('/api/images', function(req, res) {
		console.log("GET request for /api/images");
		Images.getImages(function(err, images) {
			if (err) { throw err; }
			res.json(images);
		});
	});

	//GET request to get the current highscores
	app.get('/api/highScores', function(req, res) { // 29:00
		console.log("GET request for /api/highScores");
		HighScores.getHighScores(function(err, hScores) {
			if (err) { throw err; }
			res.json(hScores);
		});
	});

	////      POST REQUESTS      ////
	//POST request to create a new high score
	app.post('/api/highScores', function(req, res) { // 41:30 https://www.youtube.com/watch?v=eB9Fq9I5ocs
		//console.log("POST request for /api/highScores");
		var hScore = req.body;
		//console.log(hScore);
		HighScores.addHighScore(hScore, function(err, hScore) {
			if (err) {
					throw err;
			}
			res.json(hScore);
		});
	});


	//POST request to create a new user
	app.post('/api/user', function(req, res){
		console.log("POST request for /api/user");
		var userData = req.body;

		//Will insert a new user into the user data collection
		UserData.addUserData(userData, function(err){
			if(err){ res.send(err); }
		});
	});

	//POST to add new image to the database
	app.post('/developerAccess', function(req, res){
		console.log("POST request for /developerAccess");
		var newImage = req.body;

		Images.addImage(newImage, function(err, newImage){
			if(err){ res.send(err); }
			else{ res.json(newImage); }
		});
	});
};
