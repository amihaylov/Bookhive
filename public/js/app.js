var BooksApp = (function() {

  var addBook = function(book) {
      type: "POST",
      url: '/books',
      data: book
    });
  };

  //TODO Make selector for id
  var updateBook = function(book) {
    $.ajax({
      type: "PUT",
      url: '/books/' + book.title,
      data: book
    });
  };

  //TODO Make selector for id
  var deleteBook = function(book) {
    $.ajax({
      type: "DELETE",
      url: '/books/' + book.title,
      data: book
    });
  };

  var displayList = function() {

    $.get( "/books", function( data ) {
      //$( ".result" ).html( data );
      var container = $("#books-database > tbody");
      container.empty();

      //Add the database
      for (var i=0; i<data.length; i+=1){
        //Add classes TODO!
        var row = $("<tr></tr>");
        var cellTitle = $("<td></td>").text(data[i].title);
        var cellAuthor = $("<td></td>").text(data[i].author);
        var cellImageSource = $("<td></td>").text(data[i].imgSrc);
        var cellReview = $("<td></td>").text(data[i].review);
        var cellPrice = $("<td></td>").text(data[i].price);
        var cellDateOfPub = $("<td></td>").text(data[i].dateOfPub);
        var cellRating = $("<td></td>").text(data[i].rating);
        var cellNumOfSales = $("<td></td>").text(data[i].numOfSales);
        var cellPromotions = $("<td></td>").text(data[i].promotions);

        row.append(cellTitle).append(cellAuthor).append(cellImageSource).append(cellReview)
            .append(cellPrice).append(cellDateOfPub).append(cellRating).append(cellNumOfSales)
            .append(cellPromotions);
        container.append(row);
      }

    },"json");
    
  };

  // public api
  return {
    addBook: addBook,
    updateBook: updateBook,
    deleteBook: deleteBook,
    displayList: displayList
  };
})();
 
