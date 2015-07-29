var BooksApp = (function() {

  var addBook = function(book) {
    $.ajax({
      type: "POST",
      url: '/books',
      data: book
    });
  };

  var updateBook = function(book, id) {
    $.ajax({
      type: "PUT",
      url: '/books/' + id,
      data: book
    });
  };

  var deleteBook = function(book, id) {
    $.ajax({
      type: "DELETE",
      url: '/books/' + id,
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

        row.append(cellTitle).append(cellAuthor).append(cellGenre).append(cellReview)
          .append(cellPrice).append(cellDateOfPub).append(cellRating).append(cellNumOfSales)
          .append(cellPromotions).append(cellImageSource).append(cellActions);
        container.append(row);
      }

    },"json");
    
  };


  var display = function(data, isComingSoon) {
    var container = $("#inner-content");
    container.empty();

    for (var i=0; i<data.length; i+=1){
      var mainRow = $("<div></div>").addClass("row item");
      var row1 = $("<div></div>").addClass("row");
      var row2 = $("<div></div>").addClass("row");

      var cellImage = $("<div></div>").addClass("col-md-3 items").prepend($('<img>',{class: 'img', src: data[i].imgSrc, alt: data[i].title}));
      var cellAuthor = $("<div></div>").addClass("col-md-3 items").text(data[i].author)
                        .prepend($('<h4></h4>').text('Author:'));
      var cellGenre = $("<div></div>").addClass("col-md-3 items").text(data[i].genre)
                        .prepend($('<h4></h4>').text('Genre:'));
      row1.append(cellImage).append(cellAuthor).append(cellGenre);
     
      if(!isComingSoon){
        var cellRating = $("<div></div>").addClass("col-md-3 items").prepend($('<h4></h4>').text('Rating:'));
        for (var j=0; j<data[i].rating; j++){
          var star = $("<i></i>").addClass("fa fa-star fa-2");
          cellRating.append(star);
        }
      }
      else
        var cellDate = $("<div></div>").addClass("col-md-3 items").prepend($('<h4></h4>').text('Date of Publishing:'))
                        .append(data[i].dateOfPub);

      var cellReview = $("<div></div>").addClass("col-md-3 items").text(data[i].review)
                        .prepend($('<h4></h4>').text('Review:'));
      var cellPrice = $("<div></div>").addClass("col-md-3 items").prepend($('<h4></h4>').text('Price:'));
      var shoppingCart = $("<i></i>").addClass("fa fa-shopping-cart").text(data[i].price);
      cellPrice.append(shoppingCart);

      if(!isComingSoon)
        row2.append(cellReview).append(cellRating).append(cellPrice);
      else
        row2.append(cellReview).append(cellDate).append(cellPrice);

      mainRow.append(row1).append(row2);
      container.append(mainRow);
    }
  };

  var displayImgReviewPrice = function() {
    $.get( "/books", function( data ) {
      display(data, false);
    },"json");
  };

  var searchForPromoAndDisplay = function(){
    $.get( "/books", function( data ) {
      var container = $("#inner-content");
      container.empty();

      //Add the database
      for (var i=0; i<data.length; i+=1){
        //Add classes TODO!
        if(data[i].promotions) {
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
          if(!data)
            break;
          var row = $("<div></div>").addClass("row item");
          var cellImage = $("<div></div>").addClass("col-md-3 items").prepend($('<img>',{class: 'img', src: data[i].imgSrc, alt: data[i].title}));
          var cellPromo = $("<div></div>").addClass("col-md-3 items").text(data[i].promotions)
                            .prepend($('<h4></h4>').text('Promotions:'));
          var cellPrice = $("<div></div>").addClass("col-md-3 items")
                            .prepend($('<h4></h4>').text('Price:'));
          var shoppingCart = $("<i></i>").addClass("fa fa-shopping-cart").text(data[i].price);
          var cellNumOfSales = $("<i></i>").addClass("col-md-3 items").text(data[i].numOfSales)
                                .prepend($('<h4></h4>').text('Number of Sales:'));
          cellPrice.append(shoppingCart);

          row.append(cellImage).append(cellPromo)
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
          if(!data)
            break;
          var row = $("<div></div>").addClass("row item");
          var cellImage = $("<div></div>").addClass("col-md-3 items").prepend($('<img>',{class: 'img', src: data[i].imgSrc, alt: data[i].title}));
          var cellPromo = $("<div></div>").addClass("col-md-3 items").text(data[i].promotions)
                            .prepend($('<h4></h4>').text('Promotions:'));
          var cellPrice = $("<div></div>").addClass("col-md-3 items")
                            .prepend($('<h4></h4>').text('Price:'));
          var shoppingCart = $("<i></i>").addClass("fa fa-shopping-cart").text(data[i].price);

          var cellRating = $("<i></i>").addClass("col-md-3 items").prepend($('<h4></h4>').text('Rating:'));
          for (var j=0; j<data[i].rating; j++){
            var star = $("<i></i>").addClass("fa fa-star fa-2");
            cellRating.append(star);
          }

          cellPrice.append(shoppingCart);

          row.append(cellImage).append(cellPromo)
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

  var searchByRatingAndDisplay = function(rating) {

    $.get( "/books/rating/" + rating, function( data ) {
      if(typeof(data)!=='undefined'){
        display(data);
      }
      else
        alert("No such book with selected rating!");

    },"json");

  };

  var searchByPriceRangeAndDisplay = function(range) {
    console.log(range);
    $.ajax({
      type: "POST",
      url: '/books/price',
      data: range,
      success: function (response) {
        display(response.data);
      }
    });

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

    $.get( "/books/" + author + '/' + genre, function( data ) {
      if(typeof(data)!=='undefined'){
        display(data);
      }
      else
        alert("No such author or genre!");

    },"json");
    
  };

  var searchByDateAndDisplay = function(date) {

    $.get( "/dates/" + date, function( data ) {
      if(typeof(data)!=='undefined'){
        display(data, true);
      }
      else
        alert("No such book published on that date! Mind the MMM-YYYY format!");

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

  //Some Bookstore methods

  var addStore = function(store) {
    $.ajax({
      type: "POST",
      url: '/stores',
      data: store
    });
  };

  var updateStore = function(store, name) {
    $.ajax({
      type: "PUT",
      url: '/stores/' + name,
      data: store
    });
  };

  var deleteStore = function(store, name) {
    $.ajax({
      type: "DELETE",
      url: '/stores/' + name,
      data: store
    });
  };

  var fillSidebarStores = function(callBack){

    $.get( "/stores", function( data ) {
      var container = $("#accordion2");
      container.empty();

      var cityStr="";
      for (var i=0; i<data.length; i++){
        if(cityStr.indexOf(data[i].city)===-1){
          cityStr+=data[i].city+" ";
          var accGroup = $("<div></div>").addClass("accordion-group");
          var accHeading = $("<div></div>").addClass("accordion-heading");
          var accToggle = $("<a></a>").addClass("accordion-toggle bookstores")
                          .text(data[i].city)
                          .prop({'href':'#collapse'+data[i].city});
          
          //For some reason prop is not working with custom tags
          accToggle.attr({'data-toggle':'collapse','data-parent':'#accordion2','city':data[i].city});

          accHeading.append(accToggle); accGroup.append(accHeading);
          container.append(accGroup);
        }
      }
      callBack();
    },"json");

  };

  //Use only to display bookstores (check model)
  var displayStoreAdmin = function(){
    $.get( "/stores", function( data ) {
      var container = $("#stores-database > tbody");
      container.empty();

      for (var i=0; i<data.length; i+=1){
        var row = $("<tr></tr>");

        var cellName = $("<td></td>").text(data[i].name);
        var cellCity = $("<td></td>").text(data[i].city);
        var cellInfo = $("<td></td>").text(data[i].info);
        var cellPhone = $("<td></td>").text(data[i].phone);
        var cellWorkTime = $("<td></td>").text(data[i].workingTime)

        /* If booksInStore is array
        var booksStr = "";
        for(var j=0; j<data[i].booksInStore.length; j++)
          booksStr+=data[i].booksInStore[j] + ' ';
        var cellBooksStore = $("<td></td>").text(booksStr);
        */

        var cellBooksStore = $("<td></td>").text(data[i].booksInStore.replace(/;/g,"; "));
        var cellLatitude = $("<td></td>").text(data[i].latitude);
        var cellLongitude = $("<td></td>").text(data[i].longitude);

        var cellActions = $("<td></td>");
        var btnEdit = $("<button></button>").text('Edit')
                .addClass("btn btn-primary edit-store")
                .prop({"type": "button", "name": data[i].name});
        var btnDelete = $("<button></button>").text('Del')
                .addClass("btn btn-danger delete-store").css({"margin-left": "10px"})
                .prop({"type": "button", "name": data[i].name});

        cellActions.append(btnEdit).append(btnDelete);

        row.append(cellName).append(cellCity).append(cellInfo).append(cellPhone)
            .append(cellWorkTime).append(cellBooksStore).append(cellLatitude)
            .append(cellLongitude).append(cellActions);

        container.append(row);
      }
    },"json");

  };

  var displayStore = function(data){
    
    var container = $("#inner-content");
    container.empty();

    for (var i=0; i<data.length; i+=1){
      var mainRow = $("<div></div>").addClass("row item");
      var row1 = $("<div></div>").addClass("row");
      var cellMap = $("<div></div>").addClass("col-md-3 items map-canvas google-map"+i);
          cellMap.attr({'id':data[i].name});

      var cellName = $("<div></div>").addClass("col-md-3 items").text(data[i].name)
                      .prepend($('<h4></h4>').text('Bookstore:'));;
      var cellInfo = $("<div></div>").addClass("col-md-3 items").text(data[i].info)
                      .prepend($('<h4></h4>').text('Info:'));;
      row1.append(cellMap).append(cellName).append(cellInfo);

      var row2 = $("<div></div>").addClass("row");
      var cellPhone = $("<div></div>").addClass("col-md-3 items").text(data[i].phone)
                        .prepend($('<h4></h4>').text('Phone:'));;
      var cellWorkTime = $("<div></div>").addClass("col-md-3 items").text(data[i].workingTime)
                          .prepend($('<h4></h4>').text('Working Time:'));;
      
      /* If booksInStore is array
      var booksStr = "";
      for(var j=0; j<data[i].booksInStore.length; j++)
        booksStr+=data[i].booksInStore[j] + ' ';
      var cellBooksStore = $("<div></div>").addClass("col-md-3 items").text(booksStr)
                            .prepend($('<h4></h4>').text('Books in store:'));;
      */

      var cellBooksStore = $("<div></div>").addClass("col-md-3 items").text(data[i].booksInStore.replace(/;/g,"; "))
                            .prepend($('<h4></h4>').text('Books in store:'));;

      row2.append(cellPhone).append(cellWorkTime).append(cellBooksStore);

      mainRow.append(row1).append(row2);
      container.append(mainRow);
    }

  };

  //You can try searching for key-value pair, instead of making hundreds of methods
  //Also for the book methods
  //Some callback magic and value transfer as parameters
  var searchStoreByBookAndDisplay = function(title, callBack){
      $.get( "/stores/books/" + title, function( data ) {
        if(typeof(data)!=='undefined'){
          displayStore(data);
        }
        else
          alert("No such book in any of the stores!");
        callBack(data);
        return (data);
      },"json");
  };

  //Some callback magic (both setGlobalData and callBack are callback functions) as parameters
  var searchStoreByCityAndDisplay = function(city, callBack){
    $.get( "/stores/" + city, function( data ) {
      if(typeof(data)!=='undefined'){
        displayStore(data);
      }
      else
        alert("No such store in the given city!");
      callBack(data);
      return (data);
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
    searchByRatingAndDisplay: searchByRatingAndDisplay,
    searchByPriceRangeAndDisplay: searchByPriceRangeAndDisplay,
    searchByAuthorAndDisplay: searchByAuthorAndDisplay,
    searchByAuthorAndGenreAndDisplay: searchByAuthorAndGenreAndDisplay,
    searchByDateAndDisplay: searchByDateAndDisplay,
    searchForPromoAndDisplay: searchForPromoAndDisplay,
    displayMostSelled: displayMostSelled,
    displayTopRated: displayTopRated,

    addStore: addStore,
    updateStore: updateStore,
    deleteStore: deleteStore,
    fillSidebar: fillSidebar,
    fillSidebarStores: fillSidebarStores,
    displayStoreAdmin: displayStoreAdmin,
    displayStore: displayStore,
    searchStoreByBookAndDisplay: searchStoreByBookAndDisplay,
    searchStoreByCityAndDisplay: searchStoreByCityAndDisplay
  };
})();
 
