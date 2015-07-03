 
var books =[
	{imgSrc: 'none', title: 'It', author: 'Stephen King', review: 'none', price: 'none'
	, dateOfPub: 'john@doe.com', rating: 'john@doe.com', numOfSales: 'john@doe.com', promotions: 'john@doe.com', genre: 'Horror' },
	{imgSrc: 'none', title: 'Green Mile', author: 'Stephen King', review: 'none', price: 'none'
	, dateOfPub: 'john@doe.com', rating: 'john@doe.com', numOfSales: 'john@doe.com', promotions: 'john@doe.com', genre: 'Drama' },
	{imgSrc: 'none', title: 'Les Miserables', author: 'Victor Hugo', review: 'none', price: 'none'
	, dateOfPub: 'john@doe.com', rating: 'john@doe.com', numOfSales: 'john@doe.com', promotions: 'john@doe.com', genre: 'Drama' },
	{imgSrc: 'none', title: 'Love Story', author: 'Edgar Segal', review: 'none', price: 'none'
	, dateOfPub: 'john@doe.com', rating: 'john@doe.com', numOfSales: 'john@doe.com', promotions: 'john@doe.com', genre: 'Romance' }
];

var test = function(data){
  var genresAuthorsArray = [{'genre':'', 'authors':['']}]; 
  for(var i=0; i<data.length; i++){
  	var found = false;
    for(var j=0; j<genresAuthorsArray.length; j++){
      if(genresAuthorsArray[j].genre.indexOf(data[i].genre) > -1) {
        for(var k=0; k<genresAuthorsArray[j].authors.length; k++){
          if(genresAuthorsArray[j].authors.indexOf(data[i].author) === -1)
            genresAuthorsArray[j].authors.push(data[i].author);
        }
        found = true;
      }
    }
    if(!found){
    	genresAuthorsArray.push({'genre': data[i].genre, 'authors':['']});
    	genresAuthorsArray[genresAuthorsArray.length-1].authors.push(data[i].author);
    }
  }
  console.log(genresAuthorsArray);
}

test(books);