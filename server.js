var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var RedisStore = require('connect-redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var swig = require('swig');
var favicon = require('serve-favicon');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var config = require('./app/config')
app.use(session({
	store: new RedisStore({
		host: config.redis.host,
		port: config.redis.port,
		pass: config.redis.pass
	}),
	secret: config.secret
}));
app.use(favicon(__dirname + '/public/favicon.ico'))
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');
app.set('view cache', false);
app.disable('x-powered-by');
swig.setDefaults({ cache: false });
app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 3030;
var apiController = require('./app/controllers/api');
var homeController = require('./app/controllers/app');
var userController = require('./app/controllers/user')
apiController(app,express);
homeController(app);
userController(app,express);
app.listen(port,function(){
	console.log("Servidor esuchando en el puerto " + port);
});