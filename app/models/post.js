var mongoose = require('./model');
var Schema       = mongoose.Schema;
var PostSchema   = new Schema({
	body: String,
	position: String,
	user_id: { type : Schema.ObjectId, ref : 'User' },
	date: { type: Date, default: Date.now },
	date_update: {type: Date, default: null }
});
module.exports = mongoose.model('Post', PostSchema);