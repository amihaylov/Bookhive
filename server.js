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
	, dateOfPub: 'john@doe.com', rating: 'john@doe.com', numOfSales: 'john@doe.com', promotions: 'john@doe.com', genre: 'SciFi' }
];

  //Name must be unique!
var bookstores =[
	{name:'Booktrading, Sofia',city:'Sofia',info:'Sofia, Graff Ignatiev str. 50; booktrading@book.com'
  	,phone:'0882 907 212',workingTime:'Mon-Fri 08-19; Sat closed; Sun - closed',booksInStore:['It','1984'],latitude:42.689295,longitude:23.327590},
	{name:'Booktrading, Varna',city:'Varna',info:'Varna, bul. Vladislav Varnenchik 258; booktrading@book.com'
	,phone:'0886 418 559',workingTime:'Mon-Fri 08-19; Sat 10-17; Sun - closed',booksInStore:['It'],latitude:43.2221833,longitude:27.8766342},
	{name:'Penguins, Plovdiv',city:'Plovdiv',info:'Sofia, Vitoshka str. 30; penguins@book.com'
	,phone:'070017661',workingTime:'Mon-Fri 08-19; Sat 10-17; Sun - closed',booksInStore:['1984'],latitude:42.147232,longitude:24.751725}
];


// collection endpoints
// get all books
app.get('/books', function(req, res){
	res.jsonp(books);
});

// post new book to the collection
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
	var genre = req.body.genre;


	var book = {imgSrc: imgSrc, title: title, author: author, review: review, price: price,
		 dateOfPub: dateOfPub, rating: rating, numOfSales: numOfSales, promotions: promotions, genre: genre };

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

// Get the books in given price range with POST
app.post('/books/price', function(req, res){
 // req.body contains the incoming fields and values
 	console.log(req.body);
	var minPrice = req.body.minPrice;
	var maxPrice = req.body.maxPrice;
	var success = false;

	var result = [];
	for (var i=0; i<books.length; i+=1) {
		if ((Number(books[i].price) >= Number(minPrice)) &&
			(Number(books[i].price) <= Number(maxPrice))) {
				result.push(books[i]);
				success = true;
		}
	}

	if (success === true)
		res.jsonp({
		msg: 'books found in price range!',
		data: result
		});
	else
		res.status(500).send('No such books in current price range!');
});

// get info about book by rating
// for eg: /books/john-doe
app.get('/books/rating/:rating', function(req, res){
 // get the title from the params
	/* If we dont use arrays
	var title = req.params.title;
	res.jsonp(books[title]);
	*/
	var success = false;
	var result = [];
	var rating = req.params.rating;
	for (var i=0; i<books.length; i+=1) {
		if (books[i].rating == rating) {
			result.push(books[i]);
			success = true;
		}
	}
	if (success === true)
		return res.jsonp(result);
	res.status(500).send('No such books with this rating!');
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

//Multiple keys (author AND genre) search
app.get('/books/:author/:genre', function(req, res){
 // get the title from the params
	/* If we dont use arrays
	var author = req.params.author;
	res.jsonp(books[author]);
	*/
	var success = false;
	var result = [];
	var author = req.params.author;
	var genre = req.params.genre;
	for (var i=0; i<books.length; i+=1) {
		if (books[i].author.indexOf(author) > -1 && books[i].genre.indexOf(genre) > -1) {
			result.push(books[i]);
			success = true;
		}
	}
	if (success === true)
		return res.jsonp(result);
	res.status(500).send('No such book author and genre!');
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
	res.status(500).send('No such book published at the given date! Mind the MMM-YYYY format!');
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
			books[i].genre = req.body.genre;
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


//Bookstores calls

//Get all stores
app.get('/stores', function(req, res){
	res.jsonp(bookstores);
});

// post new store to the collection
app.post('/stores', function(req, res){
 // req.body contains the incoming fields and values
	var name = req.body.name;
	var city = req.body.city;
	var info = req.body.info;
	var phone = req.body.phone;
	var workingTime = req.body.workingTime;
	var booksInStore = req.body.booksInStore;
	var latitude = req.body.latitude;
	var longitude = req.body.longitude;

	var store = {name: name, city: city, info: info, phone: phone, workingTime: workingTime,
		 booksInStore: booksInStore, latitude: latitude, longitude: longitude};

	bookstores.push(store);

	res.jsonp({
	msg: 'bookstore created',
	data: bookstores[bookstores.length-1]
	});
});

// put an updated version of a store by name
app.put('/stores/:name', function(req, res){
 // get the name from the params
	var name = req.params.name;
	var counter=0;
 // update the info from the body if passed or use the existing one
	/* If not using array	
	books[title].author = req.body.author;
	*/
	for (var i=0; i<bookstores.length; i+=1) {
		if (bookstores[i].name == name) {
			bookstores[i].city = req.body.city;
			bookstores[i].info = req.body.info;
			bookstores[i].phone = req.body.phone;
			bookstores[i].workingTime = req.body.workingTime;
			bookstores[i].booksInStore = req.body.booksInStore;
			bookstores[i].latitude = req.body.latitude;
			bookstores[i].longitude = req.body.longitude;
			counter=i;
		}
	}

	res.jsonp({
		msg: 'Store data updated',
		data: bookstores[counter]
	});
});

// delete an existing store by name
app.delete('/stores/:name', function(req, res){
	var name = req.params.name;
	var status = 'failed';
/*	if(books[title]){
		delete(books[title])
		res.jsonp(title + ' successfully deleted!');
	} else {
		res.jsonp(title + ' does not exist!');
	}*/
	for (var i=0; i<bookstores.length; i+=1) {
		if (bookstores[i].name == name) {
			bookstores.splice(i, 1);
			status = i;
		}
	}
	if (status !== 'failed')
		res.jsonp(name + ' successfully deleted!');
	else
		res.jsonp(name + ' does not exist!');
});

//Get all stores that contain a book by title
app.get('/stores/books/:booksInStore', function(req, res){
 // get the title from the params
	/* If we dont use arrays
	var author = req.params.author;
	res.jsonp(books[author]);
	*/
	var success = false;
	var result = [];
	var booksInStore = req.params.booksInStore;
	for (var i=0; i<bookstores.length; i+=1) {
		if (bookstores[i].booksInStore.indexOf(booksInStore) > -1) {
			result.push(bookstores[i]);
			success = true;
		}
	}
	if (success === true)
		return res.jsonp(result);
	res.status(500).send('No such book in any of the stores!');
});

//Get all stores that are located in a given city
app.get('/stores/:city', function(req, res){
 // get the title from the params
	/* If we dont use arrays
	var author = req.params.author;
	res.jsonp(books[author]);
	*/
	var success = false;
	var result = [];
	var city = req.params.city;
	for (var i=0; i<bookstores.length; i+=1) {
		if (bookstores[i].city == city) {
			result.push(bookstores[i]);
			success = true;
		}
	}
	if (success === true)
		return res.jsonp(result);
	res.status(500).send('No such store in the given city!');
});

var server = app.listen(1337, function() {
	console.log('Listening on port %d', server.address().port);
});