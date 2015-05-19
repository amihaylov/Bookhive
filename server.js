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
var books =[
	{imgSrc: 'john-doe', title: 'John Doe', author: 'john@doe.com', review: 'john@doe.com', price: 'john@doe.com'
	, dateOfPub: 'john@doe.com', rating: 'john@doe.com', numOfSales: 'john@doe.com', promotions: 'john@doe.com' }
];

//TODO make it with student - id, name, email, classes

// collection endpoints
// get all books
app.get('/books', function(req, res){
	res.jsonp(books);
});

// post new user to the collection
app.post('/books', function(req, res){
 // req.body contains the incoming fields and values
	var imgSrc = req.body.imgSrc;
	var title = req.body.title;
	var author = req.body.author;
	var review = req.body.review;
	var price = req.body.price;
	var dateOfPub = req.body.dateOfPub;
	var rating = req.body.rating;
	var numOfSales = req.body.numOfSales;
	var promotions = req.body.promotions;

	var book = {imgSrc: imgSrc, title: title, author: author, review: review, price: price,
		 dateOfPub: dateOfPub, rating: rating, numOfSales: numOfSales, promotions: promotions };

	books.push(book);

	res.jsonp({
	msg: 'book created',
	data: books[books.length-1]
	});
});


// document endpoints
// get info about book by title
// for eg: /books/john-doe
app.get('/books/:title', function(req, res){
 // get the title from the params
	/* If we dont use arrays
	var title = req.params.title;
	res.jsonp(books[title]);
	*/
	var success = false;
	var result = [];
	var title = req.params.title;
	for (var i=0; i<books.length; i+=1) {
		if (books[i].title.indexOf(title) > -1) {
			result.push(books[i]);
			success = true;
		}
	}
	if (success === true)
		return res.jsonp(result);
	res.status(500).send('No such book title!');
});

//Lesson learned! '/authors/:author' DO matter!
// '/authors/' create a different search namespace so to say
// while ':author' searches for a field/key in the data and
// therefore should be a valid one

// document endpoints
// get info about book by author
// for eg: /books/stephen%20king
app.get('/authors/:author', function(req, res){
 // get the title from the params
	/* If we dont use arrays
	var author = req.params.author;
	res.jsonp(books[author]);
	*/
	var success = false;
	var result = [];
	var author = req.params.author;
	for (var i=0; i<books.length; i+=1) {
		if (books[i].author.indexOf(author) > -1) {
			result.push(books[i]);
			success = true;
		}
	}
	if (success === true)
		return res.jsonp(result);
	res.status(500).send('No such book author!');
});

// get info about book by date of publishing
// for eg: /dates/2015-01
app.get('/dates/:dateOfPub', function(req, res){
 // get the title from the params
	/* If we dont use arrays
	var dateOfPub = req.params.dateOfPub;
	res.jsonp(books[dateOfPub]);
	*/
	var success = false;
	var result = [];
	var dateOfPub = req.params.dateOfPub;
	for (var i=0; i<books.length; i+=1) {
		if (books[i].dateOfPub.indexOf(dateOfPub) > -1) {
			result.push(books[i]);
			success = true;
		}
	}
	if (success === true)
		return res.jsonp(result);
	res.status(500).send('No such book published at the given date! Mind the YYYY-MM format!');
});

// put an updated version of a book by title
app.put('/books/:title', function(req, res){
 // get the title from the params
	var title = req.params.title;
	var counter=0;
 // update the info from the body if passed or use the existing one
	/* If not using array	
	books[title].author = req.body.author;
	*/
	for (var i=0; i<books.length; i+=1) {
		if (books[i].title == title) {
			books[i].imgSrc = req.body.imgSrc;
			books[i].author = req.body.author;
			books[i].review = req.body.review;
			books[i].price = req.body.price;
			books[i].dateOfPub = req.body.dateOfPub;
			books[i].rating = req.body.rating;
			books[i].numOfSales = req.body.numOfSales;
			books[i].promotions = req.body.promotions;
			counter=i;
		}
	}

	res.jsonp({
		msg: 'Book data updated',
		data: books[counter]
	});
});

// delete an existing book by title
app.delete('/books/:title', function(req, res){
	var title = req.params.title;
	var status = 'failed';
/*	if(books[title]){
		delete(books[title])
		res.jsonp(title + ' successfully deleted!');
	} else {
		res.jsonp(title + ' does not exist!');
	}*/
	for (var i=0; i<books.length; i+=1) {
		if (books[i].title == title) {
			books.splice(i, 1);
			status = i;
		}
	}
	if (status !== 'failed')
		res.jsonp(title + ' successfully deleted!');
	else
		res.jsonp(title + ' does not exist!');
});

// listen for requests
var server = app.listen(1337, function() {
	console.log('Listening on port %d', server.address().port);
});