// app/routes.js

var path = require('path');
var fs   = require('fs');

//need to require each model from model.js
UserData = require('./models/userData.js');
Images 	 = require('./models/image.js');
HighScores = require('./models/highScores.js');
ErrorLog = require('./models/errorLog.js');

module.exports = function(app) {
	
	//GET REQUESTS//
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
		console.log("get req on images");
		Images.getImages(function(err, images) {
			if (err) { throw err; }
			res.json(images);
		});
	});

	//GET request to get the current highscores
	app.get('/api/highScores', function(req, res) { // 29:00
		HighScores.getHighScores(function(err, hScores) {
			if (err) {
				throw err;
			}
			res.json(hScores);
		});
	});

	//POST REQUESTS//
	//POST request to create a new high score
	app.post('/api/highScores', function(req, res) { // 41:30 https://www.youtube.com/watch?v=eB9Fq9I5ocs
		var hScore = req.body;		
		HighScores.addHighScore(hScore, function(err, hScore) {
			if (err) {
				throw err;
			}
			res.json(hScore);
		});
	});


	//POST request to create a new user
	app.post('/api/user', function(req, res){
		var userData = req.body;
		console.log("req.body");
		console.log(userData);

		res.json(userData);

		//Will insert a new user into the user data collection
		// UserData.addUserData(userData, function(err, userData){
		// 	//needs to be added to database eventually
		// 	if(err){ res.send(err); }
		// 	res.json(userData);
		// })
	});

	//POST to add new image to the database
	app.post('/developerAccess', function(req, res){
		var newImage = req.body;

		Images.addImage(newImage, function(err, newImage){
			if(err){ res.send(err); }
			else{ res.json(newImage); }
		});
	});
};


