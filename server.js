const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let users = [];

app.get('/users', function(req, res){
	res.json({
		success: true,
		message: 'successfully got user. Nice!',
		users: users.map(user => user.username)
	});
});

app.get("/users/:id", function(req, res) {
	console.log(req.params.id);
	res.json({
		success: true,
		message: 'got one user',
		user: req.params.id
	});
});

app.post('/login', function(req, res){
	let username = req.body.username;
	let password = req.body.password;

	var result = users.filter(user => user.username===username && user.password===password);

	if (result.length > 0){
		res.json({
			success: true,
			message: 'password and username match',
			token: 'encrypted token goes here'
		});
	} else {
		res.json({
			success: false,
			message: 'password and username do not match'
		});
	}
});

app.post("/add", function(req, res){
	let username = req.body.username;
	let password = req.body.password;
	var result = users.filter(user => user.username===username && user.password===password)
	if(result.length > 0)
		res.json({
			success: false,
			message: 'user already taked'
		});
	else {
		users.push({ username: req.body.username, password: req.body.password });
		res.json({
			success: true,
			message: 'user added succesfully!'
		});
	}
});

app.listen(8000, function(){
	console.log("server is listening");
});