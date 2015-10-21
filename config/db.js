// config/db.js

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  location: String,
  age: Number,
  created_at: Date
});


var User = mongoose.model('User', userSchema);


module.export = User;

module.exports = {
	url : 'mongodb://MongoLab-7:5YHI93TW1sUYKovmjuHv4TGxSYfEVSH7sfjrKPG8NeI-@ds036178.mongolab.com:36178/MongoLab-7'
}