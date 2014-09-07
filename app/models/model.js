var mongoose = require('mongoose');
mongoose.connect('mongodb://luisn:mongoose@proximus.modulusmongo.net:27017/giNapu9x', function (err){
	if(err){
		console.log('Fail to connect db ' + err);
	}else{
		console.log('Connected to db');
	}
});
module.exports = mongoose;