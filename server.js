// set up requires
var express = require('express');

var path = require('path');
var app = express();                               // create our app w/ express
var morgan = require('morgan');                    // log requests to the console (express4)
var bodyParser = require('body-parser');           // pull information from HTML POST (express4)
var methodOverride = require('method-override');   // simulate DELETE and PUT (express)

var app = express();                               // create our app w/ express
var morgan = require('morgan');                    // log requests to the console (express4)
var bodyParser = require('body-parser');           // pull information from HTML POST (express4)
var methodOverride = require('method-override');   // simulate DELETE and PUT (express4)
var path = require('path');


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
});