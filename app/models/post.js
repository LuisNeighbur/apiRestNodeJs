var mongoose = require('mongoose');
var User = require('./user')
var Schema       = mongoose.Schema;

var PostSchema   = new Schema({
	body: String,
	position: String,
	user_id: Number,
	date: { type: Date, default: Date.now },
	date_update: {type: Date, default: null }
});

module.exports = mongoose.model('Post', PostSchema);