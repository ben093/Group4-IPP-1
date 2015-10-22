var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  location: String,
  age: Number,
  created_at: Date
});


var User = mongoose.model('User', userSchema);