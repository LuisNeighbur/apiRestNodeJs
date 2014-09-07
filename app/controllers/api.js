
var apiController = function (app,express){
var Post = require('../models/post');
var User = require('../models/user');
var router = express.Router();
router.use(function (req, res , next){
	if(!req.session.user)
		next(new Error('An error has ocurred'))
	console.log('Something is happening.');
	next();
});
router.route('/posts')
.get(function (req, res){
	Post
	.find({})
	.populate('user_id')
	.exec(function(error, groups) {
    	console.log(groups)
    	res.json(groups)
  	});
})
.post(function (req, res){
	User.findOne({ uid:req.body.uid }, function (err, user){
		if(err)
			res.send(err);
		var post = new Post();
		post.body = req.body.body;
		post.position = req.body.position;
		post.user_id = user;
		post.save(function (err){
			if(err)
				res.send(err);
			res.json(post);
		})
	});
});
router.route('/posts/:post_id')
	.get(function(req, res) {
		Post.findById(req.params.post_id)
		.populate('user_id')
		.exec(function(err, post) {
			if (err)
				res.send(err);
			res.json(post);
		});
	})
	.put(function(req, res) {
		User.findOne({ uid:req.body.uid }, function (err, user){
			if(err)
				res.send(err);
			Post.findById(req.params.post_id, function (err, post) {
				if (err)
					res.send(err);
				post.body = req.body.body;
				post.date_update = req.body.date;
				post.user_id = user;
				console.log(post.user_id,user)
				post.save(function(err) {
					if (err)
						res.send(err);
					res.json({ message: 'Post updated!' });
				});

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