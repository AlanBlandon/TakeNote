const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/TakeNote";
const app = express();
app.set('port', 3000);

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/app/images'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.log.bind(console, "Database Connection Failure."));
db.once('open', function(callback){
	console.log("Database Connection Successful.");
});

app.post('/signup', function(req, res){
	var name = req.body.name;
	var phone = req.body.phone;
	var email = req.body.email;
	var pswd = req.body.password;
	var data = {
		"name": name,
		"phone": phone,
		"email": email,
		"password": pswd,
	}
	db.collection('users').insertOne(data, function(err, collection){
		if (err) throw err;
		console.log("A new document (in JSON format) was added to the TakeNote database.");
	});
	return res.redirect('after_sign_up.html');
});

app.listen(app.get('port'), function(){
	console.log("Express server started on http://localhost:" + app.get('port'));
	console.log(__dirname);
});
