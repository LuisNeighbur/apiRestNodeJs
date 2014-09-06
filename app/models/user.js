var mongoose = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	name: String,
	uid: Number,
	email: String,
	birthday: Date,
	picture: String,
	token: String
});

module.exports = mongoose.model('User', UserSchema);