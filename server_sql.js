// load the express module
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mysql = require('mysql');
var fs = require('fs');
var jf = require('jsonfile');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bookhive'
});

// declare our app
var app = express();

// configuration and middleware, body parser is needed to parse POST into JSON
app.use(express.static('public'));


app.use(bodyParser.urlencoded({
	 extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

// this will serve as our resource on the server, implements JSON read/write file
var books = [];
var db =[];
var file = 'data.json';
	db = JSON.parse(fs.readFileSync(file, 'utf8'));
	if (typeof db[0] !== 'undefined')
	for (var i=0; i<db.length; i++)
		books.push(db[i]);

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

	jf.writeFile(file, books, function(err) {
  		console.log(err)
	});

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

	jf.writeFile(file, books, function(err) {
  		console.log(err)
	});

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
	if (status !== 'failed'){
		jf.writeFile(file, books, function(err) {
  			console.log(err)
		});
		res.jsonp(title + ' successfully deleted!');
	}
	else
		res.jsonp(title + ' does not exist!');
});


//Bookstores calls

//Get all stores
app.get('/stores', function(req, res){

	connection.query("SELECT * FROM stores", function(error, rows, fields){
        if(rows.length > 0){
            //var row = rows[0];
            res.jsonp(rows);
            // res.write(JSON.stringify(row));
            // res.end("");
        }
        else{
            res.end("There are no bookstores.");
        }
    });
	
});

// post new store to the collection
app.post('/stores', function(req, res){
 // req.body contains the incoming fields and values
	var name = req.body.name;
	var city = req.body.city;
	var info = req.body.info;
	var phone = req.body.phone;
	var workingTime = req.body.workingTime;
	var booksInStore = req.body.booksInStore.join(';');
	var latitude = Number(req.body.latitude);
	var longitude = Number(req.body.longitude);

	connection.query("INSERT INTO stores(name, city, info, phone, workingTime, booksInStore, latitude, longitude) VALUES('" 
		+ name + "', '" + city + "', '" + info+ "', '" + phone+ "', '" + workingTime+ "', '" + booksInStore+ "', '" + latitude 
		+ "', '" + longitude+"');", function(error, rows, fields){
                res.end("SQL INSERT bookstore completed.");
    });
	var store = {name: name, city: city, info: info, phone: phone, workingTime: workingTime,
		 booksInStore: booksInStore, latitude: latitude, longitude: longitude};

	res.jsonp({
	msg: 'bookstore created',
	data: store
	});
});

// put an updated version of a store by name
app.put('/stores/:name', function(req, res){
 // get the name from the params
	var name = req.params.name;
	city = req.body.city;
	info = req.body.info;
	phone = req.body.phone;
	workingTime = req.body.workingTime;
	booksInStore = req.body.booksInStore.join(';');
	latitude = Number(req.body.latitude);
	longitude = Number(req.body.longitude);
 // update the info from the body if passed or use the existing one

 	connection.query("UPDATE stores SET name = '" + name+"', city = '" + city+"',info = '"+info+"',workingTime ='"+workingTime+
 		"',booksInStore='"+booksInStore+"',latitude='"+latitude+"',longitude = '"+longitude+
 		"' WHERE name = '" + name+"';", function(error, rows, fields){
 		if(rows>0){
	 		res.jsonp({
			msg: 'Store data updated, SQL query completed.',
			data: bookstores[counter]
	});
 		}
 		else
 			console.log("No bookstores with name = "+name+" found.");
	});

});

// delete an existing store by name
app.delete('/stores/:name', function(req, res){
	
	var name = req.params.name;
	connection.query("DELETE FROM stores WHERE name = '" + name +"';", function(error, rows, fields){
		if (rows>0)
			res.jsonp(name + ' successfully deleted!');
		else
			res.jsonp(name + ' does not exist!');
	});

});

//Get all stores that contain a book by title
app.get('/stores/books/:booksInStore', function(req, res){
 // get the title from the params

	var booksInStore = req.params.booksInStore;

	connection.query("SELECT * FROM stores WHERE booksInStore LIKE '%"+booksInStore+"%';", function(error, rows, fields){
        if(rows.length > 0){
            //var row = rows[0];
            res.jsonp(rows);
            // res.write(JSON.stringify(row));
            // res.end("");
        }
        else{
            //res.end("No such book in any of the stores!");
            res.status(500).send('No such book in any of the stores!');
        }
    });

});

//Get all stores that are located in a given city
app.get('/stores/:city', function(req, res){
 // get the title from the params
 	var city = req.params.city;

	connection.query("SELECT * FROM stores WHERE city = '"+city+"';", function(error, rows, fields){
		if(rows.length > 0){
            //var row = rows[0];
            res.jsonp(rows);
            // res.write(JSON.stringify(row));
            // res.end("");
        }
        else{
            //res.end("No such book in any of the stores!");
            res.status(500).send('No such store in the given city!');
        }
	});
	
});

var server = app.listen(1337, function() {
	console.log('Listening on port %d', server.address().port);
});