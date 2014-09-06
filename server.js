var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var RedisStore = require('connect-redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var swig = require('swig');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
	store: new RedisStore({
		host: 'pub-redis-13443.us-east-1-3.4.ec2.garantiadata.com',
		port: 13443,
		pass: 'redistest'
	}),
	secret: 'lolcatz'
}));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });
var port = process.env.PORT || 3030;

var apiController = require('./app/controllers/api');
var homeController = require('./app/controllers/app');
apiController(app,express);
homeController(app);
app.listen(port,function(){
	console.log("Servidor esuchando en el puerto " + port);
});