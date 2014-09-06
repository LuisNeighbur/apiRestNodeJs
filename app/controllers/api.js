var mongoose = require('mongoose');
var apiController = function (app,express){
	mongoose.connect('mongodb://luisn:mongoose@proximus.modulusmongo.net:27017/giNapu9x', function (err){
	if(err){
		console.log('Fail to connect db ' + err);
	}else{
		console.log('Connected to db');
	}
});
var Post     = require('../models/post');
var router = express.Router();
router.use(function (req, res , next){
	if(!req.session.user)
		next(new Error('An error has ocurred'))
	console.log('Something is happening.');
	next();
});
router.route('/posts')
.get(function (req, res){
	Post.find(function(err, posts) {
			if (err)
				res.send(err);

			res.json(posts);
		});
})
.post(function (req, res){
	var post = new Post();
	post.body = req.body.body;
	post.position = req.body.position;
	post.user_id = req.body.uid;
	post.date = req.body.date;
	post.save(function (err){
		if(err)
			res.send(err);
		res.json({ message: 'Post created!' });
	})
});
router.route('/posts/:post_id')
	.get(function(req, res) {
		Post.findById(req.params.post_id, function(err, post) {
			if (err)
				res.send(err);
			res.json(post);
		});
	})
	.put(function(req, res) {
		Post.findById(req.params.post_id, function(err, post) {
			if (err)
				res.send(err);
			post.body = req.body.body;
			post.date_update = req.body.date;
			post.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Post updated!' });
			});

		});
	}).delete(function(req, res) {
		Post.remove({
			_id: req.params.post_id
		}, function(err, post) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	});

app.use('/api', router);
};
module.exports = apiController;