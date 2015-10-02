// set up requires
var express = require('express');
<<<<<<< HEAD
var path = require('path');
var app = express();                               // create our app w/ express
var morgan = require('morgan');                    // log requests to the console (express4)
var bodyParser = require('body-parser');           // pull information from HTML POST (express4)
var methodOverride = require('method-override');   // simulate DELETE and PUT (express)
=======
var app = express();                               // create our app w/ express
var morgan = require('morgan');                    // log requests to the console (express4)
var bodyParser = require('body-parser');           // pull information from HTML POST (express4)
var methodOverride = require('method-override');   // simulate DELETE and PUT (express4)
var path = require('path');

>>>>>>> ed0e3b75303a5519cc924b5ca7b769d31e30dc71

//var mongodb = require('mongodb');                  // Mongo Database
//var mongoClient = mongodb.MongoClient;
//var mongoose = require('mongoose');                // Will handle mongoDB

//var url = 'mongodb:://localhost:27017/test';       //mongoDB url (localhost for testing)

// configuration
app.use(express.static(__dirname + '/public'));           // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

<<<<<<< HEAD


//Primary routes
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/Public/Views/index.html'));
});

app.get('/info', function (req, res) {
    res.sendFile(path.join(__dirname, '/Public/Views/info.html'));
});

app.get('/hscores', function (req, res) {
    res.sendFile(path.join(__dirname, '/Public/Views/hscores.html'));
});

app.get('/game', function (req, res) {
    res.sendFile(path.join(__dirname, '/Public/Views/game.html'));
=======
app.get('*', function (req, res) {
    res.sendfile(path.join(__dirname, '/Public/Views/base.html'));
>>>>>>> ed0e3b75303a5519cc924b5ca7b769d31e30dc71
});

//Connect to database and do some simple insertion and deletion calls
//MongoClient.connect(url, function (err, db) {
//    if (err) {
//        console.log('Unable to connect');
//    } else {
//        console.log("Connected to ", url);
//        db.close(); //gotta change path in dbpath mongo
//    }
//});