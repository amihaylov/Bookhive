var fs = require('fs');
var books = [];

function openFile() {
	// Might need jQuery to parse JSON file into objects.
 
	var file = 'books.json'
	db = JSON.parse(fs.readFileSync(file, 'utf8'));
	if (typeof db[0] !== 'undefined')
	for (var i=0; i<db.length; i++)
		books.push(db[i]);
	console.log(books);
}
openFile();