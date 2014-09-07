var User = require('../models/user');
var homeController = function (app){
	app.get('/', function (req, res){
		res.render('index');
	});
	app.get('/test', function (req, res){
		res.render('test')
	});
	app.post('/sing-up', function (req, res){
		var body = req.body;
		if(!body.id || 
			!body.name || 
			!body.birthday || 
			!body.email || 
			!body.picture || 
			!body.token){
			res.json({ message: 'Error: need all field'});
		}else{
			var user = new User();
			user.uid = body.id;
			user.name = body.name;
			user.birthday = body.birthday;
			user.email = body.email;
			user.picture = body.picture;
			user.token = body.token;
			user.save(function (err){
				if(err)
					res.send(err);

				res.json({ message: 'Sing up successful'});
			});
		}	
	});
	app.post('/sing-in', function (req, res){
		User.findOne({ uid: req.body.id }, function (err,user){
			if(err)
				res.send('Error on sing-in')
			if(!user)
				res.send('Error on sing-in')
			req.session.user = user;
			res.json(user);
		});
	});
};
module.exports = homeController;