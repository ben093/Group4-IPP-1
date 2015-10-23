// app/routes.js

var path = require('path');
var fs   = require('fs');

module.exports = function(app) {
	
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname , '../public','views/index.html')); // load our public/index.html file
	});
};