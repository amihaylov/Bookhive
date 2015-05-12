// load the express module
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// declare our app
var app = express();

// configuration and middleware, body parser is needed to parse POST into JSON
app.use(express.static('public'));


app.use(bodyParser.urlencoded({
	 extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

// this will serve as our resource on the server
var students =[
	{id: 'john-doe', name: 'John Doe', email: 'john@doe.com'},
	{id: 'jane-doe', name: 'Jane Doe', email: 'jane@doe.com'}
];

//TODO make it with student - id, name, email, classes

// collection endpoints
// get all students
app.get('/students', function(req, res){
	res.jsonp(students);
});

// post new user to the collection
app.post('/students', function(req, res){
 // req.body contains the incoming fields and values
	var id = req.body.id;
	var name = req.body.name;
	var email = req.body.email;
	students.push({
		id: id,
		name: name,
		email: email
	});

	res.jsonp({
	msg: 'student created',
	data: students[students.length-1]
	});
});


// document endpoints
// get info about user by id
// for eg: /students/john-doe
app.get('/students/:id', function(req, res){
 // get the id from the params
	/* If we dont use arrays
	var id = req.params.id;
	res.jsonp(students[id]);
	*/
	var id = req.params.id;
	for (var i=0; i<students.length; i+=1) {
		if (students[i].id == id) {
			return res.jsonp(students[i]);
		}
	}
	res.status(500).send('No such student id!');
});

// put an updated version of a user by id
app.put('/students/:id', function(req, res){
 // get the id from the params
	var id = req.params.id;
	var counter=0;
 // update the info from the body if passed or use the existing one
	/* If not using array	
	students[id].name = req.body.name || students[id].name;
	students[id].email = req.body.email || students[id].email;
	*/
	for (var i=0; i<students.length; i+=1) {
		if (students[i].id == id) {
			students[i].name = req.body.name;
			students[i].email = req.body.email;
			counter=i;
		}
	}

	res.jsonp({
		msg: 'user data updated',
		data: students[counter]
	});
});

// delete an existing user by id
app.delete('/students/:id', function(req, res){
	var id = req.params.id;
	var status = 'failed';
/*	if(students[id]){
		delete(students[id])
		res.jsonp('user '+id+' successfully deleted!');
	} else {
		res.jsonp('user '+id+' does not exist!');
	}*/
	for (var i=0; i<students.length; i+=1) {
		if (students[i].id == id) {
			students.splice(i, 1);
			status = i;
		}
	}
	if (status !== 'failed')
		res.jsonp('user '+id+' successfully deleted!');
	else
		res.jsonp('user '+id+' does not exist!');
});

// listen for requests
var server = app.listen(1337, function() {
	console.log('Listening on port %d', server.address().port);
});