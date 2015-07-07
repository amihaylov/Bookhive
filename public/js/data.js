var BooksData = (function() { 

	var getData = function() {
		var data = [

					{

					    "imgSrc": "https://upload.wikimedia.org/wikipedia/en/5/5a/It_cover.jpg",
					    "title": "It",
					    "author": "Stephen King",
					    "review": "One of the best horror stories ever",
					    "price": "13",
					    "dateOfPub": "10-Sep-1986",
					    "rating": "4",
					    "numOfSales": "200000",
					    "promotions": "",
					    "genre": "Horror"

					},
					{

					    "imgSrc": "https://upload.wikimedia.org/wikipedia/en/f/f7/Greenmilepart1.jpg",
					    "title": "Green Mile",
					    "author": "Stephen King",
					    "review": "Goodness can be found in the darkest places",
					    "price": "10",
					    "dateOfPub": "10-Mar-1996",
					    "rating": "5",
					    "numOfSales": "300000",
					    "promotions": "Buy the whole series with a 50% discount only in July!",
					    "genre": "Drama"

					},
					{

					    "imgSrc": "https://upload.wikimedia.org/wikipedia/en/d/d5/I_robot.jpg",
					    "title": "I, robot",
					    "author": "Isaac Asimov",
					    "review": "One of the first AI related books.",
					    "price": "10",
					    "dateOfPub": "02-Dec-1950",
					    "rating": "5",
					    "numOfSales": "3000000",
					    "promotions": "",
					    "genre": "SciFi"

					},
					{

					    "imgSrc": "",
					    "title": "Twilight 5",
					    "author": "Stephenie Meyer",
					    "review": "A shining and supernatural story of neverending love.",
					    "price": "20",
					    "dateOfPub": "23-Sep-2015",
					    "rating": "3",
					    "numOfSales": "0",
					    "promotions": "",
					    "genre": "Romance"

					},
					{

					    "imgSrc": "",
					    "title": "Harry Potter 8 (and the Wizard of JS)",
					    "author": "J. K. Rowling",
					    "review": "The boy with the lightning scar returns.",
					    "price": "50",
					    "dateOfPub": "01-Jan-2016",
					    "rating": "2",
					    "numOfSales": "0",
					    "promotions": "",
					    "genre": "Fantasy"

					},

					    {
					        "imgSrc": "https://upload.wikimedia.org/wikipedia/en/c/c3/1984first.jpg",
					        "title": "1984",
					        "author": "George Orwell",
					        "review": "All fears for the future in one book.",
					        "price": "48",
					        "dateOfPub": "08-Jun-1949",
					        "rating": "5",
					        "numOfSales": "1000000",
					        "promotions": "",
					        "genre": "Drama"
					    }

					]
		return data;
	};

return {
	getData: getData
};
})();