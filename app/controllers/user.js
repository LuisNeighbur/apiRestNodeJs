var userController = function (app,express){
var User = require('../models/user');
var router = express.Router();
router.use(function (req, res , next){
	if(!req.session.user){
		res.status(403);
		next('Forbiden');
	}else{
		next();
	}
	console.log('Something is happening.');
});
router.route('/users')
.get(function (req, res){
	User.find(function (error, groups) {

    	res.json(groups)
  	});
});
router.route('/users/:user_id')
	.get(function(req, res) {
		User.findById(req.params.user_id, function (err, post) {
			if (err)
				res.send(err);
			res.json(post);
		});
	})
	.put(function(req, res) {
			User.findById(req.params.user_id, function (err, post) {
				if (err)
					res.send(err);
				post.body = req.body.body;
				post.date_update = req.body.date;
				post.user_id = user;
				post.save(function(err) {
					if (err)
						res.send(err);
					res.json({ message: 'User updated!' });
				});
			});
	}).delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, post) {
			if (err)
				res.send(err);
			res.json(post);
		});
	});

app.use('/api', router);
};
module.exports = userController;