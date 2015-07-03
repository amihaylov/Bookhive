var BooksApp = (function() {

  var addBook = function(book) {
    $.ajax({
      type: "POST",
      url: '/books',
      data: book
    });
  };

  //
  var updateBook = function(book, id) {
    $.ajax({
      type: "PUT",
      url: '/books/' + id,
      data: book
    });
  };

  //
  var deleteBook = function(book, id) {
    $.ajax({
      type: "DELETE",
      url: '/books/' + id,
      data: book
    });
  };

  var displayList = function() {

    $.get( "/books", function( data ) {
      var container = $("#books-database > tbody");
      container.empty();

      for (var i=0; i<data.length; i+=1){
        var row = $("<tr></tr>");
        var cellTitle = $("<td></td>").text(data[i].title);
        var cellAuthor = $("<td></td>").text(data[i].author);
        var cellGenre = $("<td></td>").text(data[i].genre);
        var cellImageSource = $("<td></td>").text(data[i].imgSrc);
        var cellReview = $("<td></td>").text(data[i].review);
        var cellPrice = $("<td></td>").text(data[i].price);
        var cellDateOfPub = $("<td></td>").text(data[i].dateOfPub);
        var cellRating = $("<td></td>").text(data[i].rating);
        var cellNumOfSales = $("<td></td>").text(data[i].numOfSales);
        var cellPromotions = $("<td></td>").text(data[i].promotions);
        var cellActions = $("<td></td>");
        var btnEdit = $("<button></button>").text('Edit')
                .addClass("btn btn-primary edit-book")
                .prop({"type": "button", "name": data[i].title});
        var btnDelete = $("<button></button>").text('Del')
                .addClass("btn btn-danger delete-book").css({"margin-left": "10px"})
                .prop({"type": "button", "name": data[i].title});

        cellActions.append(btnEdit).append(btnDelete);

        row.append(cellTitle).append(cellAuthor).append(cellGenre).append(cellReview).append(cellPrice)
            .append(cellDateOfPub).append(cellRating).append(cellNumOfSales)
            .append(cellPromotions).append(cellImageSource).append(cellActions);
        container.append(row);
      }

    },"json");
    
  };

  var display = function(data) {
    var container = $("#inner-content");
    container.empty();

    for (var i=0; i<data.length; i+=1){
      var row = $("<div></div>").addClass("row item");
      var cellImage = $("<div></div>").addClass("col-md-3 items").prepend($('<img>',{class: 'img', src: data[i].imgSrc, alt: 'Error opening image!'}));
      var cellReview = $("<div></div>").addClass("col-md-3 items").text(data[i].review);
      var cellPrice = $("<div></div>").addClass("col-md-3 items");
      var shoppingCart = $("<i></i>").addClass("fa fa-shopping-cart").text(data[i].price);
      cellPrice.append(shoppingCart);

      row.append(cellImage).append(cellReview).append(cellPrice);
      container.append(row);
    }
  };

  var displayImgReviewPrice = function() {
    $.get( "/books", function( data ) {
      display(data);
    },"json");
    
  };

  var searchForPromoAndDisplay = function(){
    $.get( "/books", function( data ) {
      var container = $("#inner-content");
      container.empty();

      //Add the database
      for (var i=0; i<data.length; i+=1){
        //Add classes TODO!
        if(typeof(data[i].promotions) !== 'undefined' || data[i].promotions.length()>0) {
          var row = $("<div></div>").addClass("row item");
          var cellImage = $("<div></div>").addClass("col-md-3 items").prepend($('<img>',{class: 'img', src: data[i].imgSrc}));
          var cellReview = $("<div></div>").addClass("col-md-3 items").text(data[i].review);
          var cellPromo = $("<div></div>").addClass("col-md-3 items").text(data[i].promotions);
          var cellPrice = $("<div></div>").addClass("col-md-3 items");
          var shoppingCart = $("<i></i>").addClass("fa fa-shopping-cart").text(data[i].price);
          cellPrice.append(shoppingCart);

          row.append(cellImage).append(cellReview).append(cellPromo).append(cellPrice);
          container.append(row);
        }
      }
    },"json");
  };

  //Sorting the whole data descending and returning top 5 selled items
  var displayMostSelled = function(){
    $.get( "/books", function( data ) {
      var container = $("#inner-content");
      container.empty();
      
      data.sort(function(a, b){
        var keyA = a.numOfSales,
        keyB = b.numOfSales;
        // Compare the 2 number of sales
        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
        return 0;
      });

      //Add the database
      for (var i=0; i<5; i+=1){
        //Add classes TODO!
          var row = $("<div></div>").addClass("row item");
          var cellImage = $("<div></div>").addClass("col-md-3 items").prepend($('<img>',{class: 'img', src: data[i].imgSrc}));
          var cellReview = $("<div></div>").addClass("col-md-3 items").text(data[i].review);
          var cellPromo = $("<div></div>").addClass("col-md-3 items").text(data[i].promotions);
          var cellPrice = $("<div></div>").addClass("col-md-3 items");
          var shoppingCart = $("<i></i>").addClass("fa fa-shopping-cart").text(data[i].price);
          var cellNumOfSales = $("<i></i>").addClass("col-md-3 items").text(data[i].numOfSales);
          cellPrice.append(shoppingCart);

          row.append(cellImage).append(cellReview).append(cellPromo)
              .append(cellPrice).append(cellNumOfSales);
          container.append(row);
      }
    },"json");
  };

  var displayTopRated = function(){
  $.get( "/books", function( data ) {
    var container = $("#inner-content");
    container.empty();
    
    data.sort(function(a, b){
      var keyA = a.rating,
      keyB = b.rating;
      // Compare the 2 number of sales
      if(keyA > keyB) return -1;
      if(keyA < keyB) return 1;
      return 0;
    });

    //Add the database
    for (var i=0; i<5; i+=1){
      //Add classes TODO!
        var row = $("<div></div>").addClass("row item");
        var cellImage = $("<div></div>").addClass("col-md-3 items").prepend($('<img>',{class: 'img', src: data[i].imgSrc}));
        var cellReview = $("<div></div>").addClass("col-md-3 items").text(data[i].review);
        var cellPromo = $("<div></div>").addClass("col-md-3 items").text(data[i].promotions);
        var cellPrice = $("<div></div>").addClass("col-md-3 items");
        var shoppingCart = $("<i></i>").addClass("fa fa-shopping-cart").text(data[i].price);
        var cellRating = $("<i></i>").addClass("col-md-3 items").text(data[i].rating);
        cellPrice.append(shoppingCart);

        row.append(cellImage).append(cellReview).append(cellPromo)
            .append(cellPrice).append(cellRating);
        container.append(row);
     }
   },"json");
  };

  var searchByTitleAndDisplay = function(title) {

    $.get( "/books/" + title, function( data ) {
      if(typeof(data)!=='undefined'){
        display(data);
      }
      else
        alert("No such book!");

    },"json");
    
  };

  var searchByAuthorAndDisplay = function(author) {

    $.get( "/authors/" + author, function( data ) {
      if(typeof(data)!=='undefined'){
        display(data);
      }
      else
        alert("No such author!");

    },"json");
    
  };

  var searchByAuthorAndGenreAndDisplay = function(author, genre) {

    $.get( "/books/" + author+'/'+genre, function( data ) {
      if(typeof(data)!=='undefined'){
        display(data);
      }
      else
        alert("No such author and genre!");

    },"json");
    
  };

  var searchByDateAndDisplay = function(date) {

    $.get( "/dates/" + date, function( data ) {
      if(typeof(data)!=='undefined'){
        display(data);
      }
      else
        alert("No such book published on that date! Mind the YYYY-MMM format!");

    },"json");
    
  };

  //Fill the sidebar dynamicaly, first check for genres, then which author belongs to where 
  var fillSidebar = function(callBack){
    $.get( "/books", function( data ) {
      var container = $("#accordion2");
      container.empty();

      //Checking every book to extract genre and author and build container array
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
      
      //Build sidebar menu from array, skipping empty values
      for(var i=1; i<genresAuthorsArray.length; i++){
        var accGroup = $("<div></div>").addClass("accordion-group");
        var accHeading = $("<div></div>").addClass("accordion-heading");
        var accToggle = $("<a></a>").addClass("accordion-toggle")
                        .text(genresAuthorsArray[i].genre)
                        .prop({'href':'#collapse'+genresAuthorsArray[i].genre});
        
        //For some reason prop is not working with custom tags
        accToggle.attr({'data-toggle':'collapse','data-parent':'#accordion2'});

        accHeading.append(accToggle); accGroup.append(accHeading);

        var accBody = $("<div></div>").addClass("accordion-body collapse")
                .prop({'id':'collapse'+genresAuthorsArray[i].genre});
        var accInner = $("<div></div>").addClass("accordion-inner")

        for(var j=1; j<genresAuthorsArray[i].authors.length; j++){
          var authorsParagr = $("<p></p>").addClass("author")
                              .text(genresAuthorsArray[i].authors[j])
                              .prop({'id':genresAuthorsArray[i].authors[j]});
          authorsParagr.attr('genre',genresAuthorsArray[i].genre)
          accInner.append(authorsParagr);
        }
        accBody.append(accInner);
        accGroup.append(accBody);
        container.append(accGroup);
      }
      callBack();
    },"json");
  };

  // public api
  return {
    addBook: addBook,
    updateBook: updateBook,
    deleteBook: deleteBook,
    displayList: displayList,
    displayImgReviewPrice: displayImgReviewPrice,
    searchByTitleAndDisplay: searchByTitleAndDisplay,
    searchByAuthorAndDisplay: searchByAuthorAndDisplay,
    searchByAuthorAndGenreAndDisplay: searchByAuthorAndGenreAndDisplay,
    searchByDateAndDisplay: searchByDateAndDisplay,
    searchForPromoAndDisplay: searchForPromoAndDisplay,
    displayMostSelled: displayMostSelled,
    displayTopRated: displayTopRated,
    fillSidebar:fillSidebar
  };
})();
 
