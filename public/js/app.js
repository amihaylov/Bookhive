var BooksApp = (function() {
  
  //Title must be unique!
  var books =[
  {imgSrc: 'john-doe', title: 'John Doe', author: 'john@doe.com', review: 'john@doe.com', price: 'john@doe.com'
  , dateOfPub: 'john@doe.com', rating: 'john@doe.com', numOfSales: 'john@doe.com', promotions: 'john@doe.com', genre: 'SciFi' }
  ];

  //Name must be unique!
  var bookstores =[{name:'Booktrading, Sofia',city:'Sofia',info:'Sofia, Patriarh Evtimii str. 30; booktrading@book.com'
  ,phone:'01234',workingTime:'Mon-Fri 08-19; Sat 10-17; Sun - closed',booksInStore:['It','1984'],latitude:30,longitude:30},
  {name:'Booktrading, Plovdiv',city:'Plovdiv',info:'Plovdiv, bul. Bulgaria; booktrading@book.com'
  ,phone:'012346',workingTime:'Mon-Fri 08-19; Sat 10-17; Sun - closed',booksInStore:['It'],latitude:42,longitude:23},
  {name:'Penguins, Sofia',city:'Sofia',info:'Sofia, Vitoshka str. 30; penguins@book.com'
  ,phone:'1111',workingTime:'Mon-Fri 08-19; Sat 10-17; Sun - closed',booksInStore:['1984'],latitude:10,longitude:10}];

  
  //Used in admin panel, gets all the book data and puts it in HTML
  var displayList = function() {

      var container = $("#books-database > tbody");
      container.empty();

      for (var i=0; i<data.length; i+=1){
        var row = $("<tr></tr>");
        var cellTitle = $("<td></td>").text(books[i].title);
        var cellAuthor = $("<td></td>").text(books[i].author);
        var cellGenre = $("<td></td>").text(books[i].genre);
        var cellImageSource = $("<td></td>").text(books[i].imgSrc);
        var cellReview = $("<td></td>").text(books[i].review);
        var cellPrice = $("<td></td>").text(books[i].price);
        var cellDateOfPub = $("<td></td>").text(books[i].dateOfPub);
        var cellRating = $("<td></td>").text(books[i].rating);
        var cellNumOfSales = $("<td></td>").text(books[i].numOfSales);
        var cellPromotions = $("<td></td>").text(books[i].promotions);
        var cellActions = $("<td></td>");
        var btnEdit = $("<button></button>").text('Edit')
                .addClass("btn btn-primary edit-book")
                .prop({"type": "button", "name": books[i].title});
        var btnDelete = $("<button></button>").text('Del')
                .addClass("btn btn-danger delete-book").css({"margin-left": "10px"})
                .prop({"type": "button", "name": books[i].title});

        cellActions.append(btnEdit).append(btnDelete);

        row.append(cellTitle).append(cellAuthor).append(cellGenre).append(cellReview).append(cellPrice)
            .append(cellDateOfPub).append(cellRating).append(cellNumOfSales)
            .append(cellPromotions).append(cellImageSource).append(cellActions);
        container.append(row);
      }

    
    
  };

  //Puts a book data (image, review and price only) into HTML elements
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

  //Displays all the books
  var displayImgReviewPrice = function() {
      display(books);  
  };

  //TOTEST Refactor with server.js
  var searchByTitleAndDisplay = function(title) {

    //Get info about book by title
    var result = [];
    for (var i=0; i<books.length; i+=1) 
      if (books[i].title.indexOf(title) > -1) 
        result.push(books[i]);

      if(typeof(result)!=='undefined')
        display(data);
      else
        alert("No such book!");
  };

  //TOTEST Refactor with server.js
  var searchByAuthorAndDisplay = function(author) {

    //Get info about book by author
    var result = [];
    for (var i=0; i<books.length; i+=1) 
      if (books[i].author.indexOf(author) > -1) 
        result.push(books[i]);
    
      if(typeof(result)!=='undefined')
        display(result);
      else
        alert("No such author!");
  };

  //TOTEST Refactor with server.js
  var searchByAuthorAndGenreAndDisplay = function(author, genre) {

    //Get info about book by author and genre
    var result = [];
    for (var i=0; i<books.length; i+=1) {
      if (books[i].author.indexOf(author) > -1 && books[i].genre.indexOf(genre) > -1) 
        result.push(books[i]);
        
      if(typeof(result)!=='undefined')
        display(result);
      else
        alert("No such author and genre!");
    
  };

  //TOTEST Refactor with server.js
  var searchByDateAndDisplay = function(date) {

    //Get info about book by date of publication
    var result = [];
    for (var i=0; i<books.length; i+=1) {
      if (books[i].dateOfPub.indexOf(date) > -1) {
        result.push(books[i]);

      if(typeof(result)!=='undefined')
        display(result);
      else
        alert("No such book published on that date! Mind the MMM-YYYY format!");
    
  };

  //TOTEST Refactor with server.js
  //Fill the sidebar dynamicaly, first check for genres, then which author belongs to where 
  var fillSidebar = function(callBack){
   
      var container = $("#accordion2");
      container.empty();

      //Checking every book to extract genre and author and build container array
      var genresAuthorsArray = [{'genre':'', 'authors':['']}]; 
      for(var i=0; i<books.length; i++){
        var found = false;
        for(var j=0; j<genresAuthorsArray.length; j++){
          if(genresAuthorsArray[j].genre.indexOf(books[i].genre) > -1) {
            for(var k=0; k<genresAuthorsArray[j].authors.length; k++){
              if(genresAuthorsArray[j].authors.indexOf(books[i].author) === -1)
                genresAuthorsArray[j].authors.push(books[i].author);
            }
            found = true;
          }
        }
        if(!found){
          genresAuthorsArray.push({'genre': books[i].genre, 'authors':['']});
          genresAuthorsArray[genresAuthorsArray.length-1].authors.push(books[i].author);
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
  };

  //Some Bookstore methods
  var fillSidebarStores = function(callBack){
    var container = $("#accordion2");
    container.empty();

    var cityStr="";
    for (var i=0; i<bookstores.length; i++){
      if(cityStr.indexOf(bookstores[i].city)===-1){
        cityStr+=bookstores[i].city+" ";
        var accGroup = $("<div></div>").addClass("accordion-group");
        var accHeading = $("<div></div>").addClass("accordion-heading");
        var accToggle = $("<a></a>").addClass("accordion-toggle bookstores")
                        .text(bookstores[i].city)
                        .prop({'href':'#collapse'+bookstores[i].city});
        
        //For some reason prop is not working with custom tags
        accToggle.attr({'data-toggle':'collapse','data-parent':'#accordion2','city':bookstores[i].city});

        accHeading.append(accToggle); accGroup.append(accHeading);
        container.append(accGroup);
      }
    }
    callBack();
  };

  //Use only to display bookstores (check model)
  var displayStore = function(data){
    var container = $("#inner-content");
    container.empty();

    for (var i=0; i<data.length; i+=1){
      var row1 = $("<div></div>").addClass("row item");
      var cellMap = $("<div></div>").addClass("col-md-3 items map-canvas google-map"+i);
          cellMap.attr({'id':data[i].name});

      var cellName = $("<div></div>").addClass("col-md-3 items").text(data[i].name);
      var cellInfo = $("<div></div>").addClass("col-md-3 items").text(data[i].info);
      row1.append(cellMap).append(cellName).append(cellInfo);

      var row2 = $("<div></div>").addClass("row item");
      var cellPhone = $("<div></div>").addClass("col-md-3 items").text(data[i].phone);
      var cellWorkTime = $("<div></div>").addClass("col-md-3 items").text(data[i].workingTime);

      var booksStr = "";
      for(var j=0; j<data[i].booksInStore.length; j++)
        booksStr+=data[i].booksInStore[j] + ' ';
      var cellBooksStore = $("<div></div>").addClass("col-md-3 items").text(booksStr);

      row2.append(cellPhone).append(cellWorkTime).append(cellBooksStore);

      container.append(row1).append(row2);
    }
  };

  //You can try searching for key-value pair, instead of making hundreds of methods
  //Also for the book methods
  var searchStoreByBookAndDisplay = function(title){
    var result = [];

    for (var i=0; i<bookstores.length; i++){
      var found = false;
      for (var j=0; j<bookstores[i].booksInStore.length; j++)
        if(title===bookstores[i].booksInStore[j]){
          found = true; break;
        }
      if(found)
        result.push(bookstores[i]);
    }
    displayStore(result);
    return (result);
  };

  var searchStoreByCityAndDisplay = function(city){
    var result = [];

    for (var i=0; i<bookstores.length; i++){
      if(city===bookstores[i].city)
        result.push(bookstores[i]);
    }
    displayStore(result);
    return (result);
  };

  // public api
//Title must be unique!
  var books =[
  {imgSrc: 'john-doe', title: 'John Doe', author: 'john@doe.com', review: 'john@doe.com', price: 'john@doe.com'
  , dateOfPub: 'john@doe.com', rating: 'john@doe.com', numOfSales: 'john@doe.com', promotions: 'john@doe.com', genre: 'SciFi' }
  ];

  //Name must be unique!
  var bookstores =[{name:'Booktrading, Sofia',city:'Sofia',info:'Sofia, Patriarh Evtimii str. 30; booktrading@book.com'
  ,phone:'01234',workingTime:'Mon-Fri 08-19; Sat 10-17; Sun - closed',booksInStore:['It','1984'],latitude:30,longitude:30},
  {name:'Booktrading, Plovdiv',city:'Plovdiv',info:'Plovdiv, bul. Bulgaria; booktrading@book.com'
  ,phone:'012346',workingTime:'Mon-Fri 08-19; Sat 10-17; Sun - closed',booksInStore:['It'],latitude:42,longitude:23},
  {name:'Penguins, Sofia',city:'Sofia',info:'Sofia, Vitoshka str. 30; penguins@book.com'
  ,phone:'1111',workingTime:'Mon-Fri 08-19; Sat 10-17; Sun - closed',booksInStore:['1984'],latitude:10,longitude:10}];

  
  //Used in admin panel, gets all the book data and puts it in HTML
  var displayList = function() {

      var container = $("#books-database > tbody");
      container.empty();

      for (var i=0; i<data.length; i+=1){
        var row = $("<tr></tr>");
        var cellTitle = $("<td></td>").text(books[i].title);
        var cellAuthor = $("<td></td>").text(books[i].author);
        var cellGenre = $("<td></td>").text(books[i].genre);
        var cellImageSource = $("<td></td>").text(books[i].imgSrc);
        var cellReview = $("<td></td>").text(books[i].review);
        var cellPrice = $("<td></td>").text(books[i].price);
        var cellDateOfPub = $("<td></td>").text(books[i].dateOfPub);
        var cellRating = $("<td></td>").text(books[i].rating);
        var cellNumOfSales = $("<td></td>").text(books[i].numOfSales);
        var cellPromotions = $("<td></td>").text(books[i].promotions);
        var cellActions = $("<td></td>");
        var btnEdit = $("<button></button>").text('Edit')
                .addClass("btn btn-primary edit-book")
                .prop({"type": "button", "name": books[i].title});
        var btnDelete = $("<button></button>").text('Del')
                .addClass("btn btn-danger delete-book").css({"margin-left": "10px"})
                .prop({"type": "button", "name": books[i].title});

        cellActions.append(btnEdit).append(btnDelete);

        row.append(cellTitle).append(cellAuthor).append(cellGenre).append(cellReview).append(cellPrice)
            .append(cellDateOfPub).append(cellRating).append(cellNumOfSales)
            .append(cellPromotions).append(cellImageSource).append(cellActions);
        container.append(row);
      }

    
    
  };

  //Puts a book data (image, review and price only) into HTML elements
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

  //Displays all the books
  var displayImgReviewPrice = function() {
      display(books);  
  };

  //TOTEST Refactor with server.js
  var searchByTitleAndDisplay = function(title) {

    //Get info about book by title
    var result = [];
    for (var i=0; i<books.length; i+=1) 
      if (books[i].title.indexOf(title) > -1) 
        result.push(books[i]);

      if(typeof(result)!=='undefined')
        display(data);
      else
        alert("No such book!");
  };

  //TOTEST Refactor with server.js
  var searchByAuthorAndDisplay = function(author) {

    //Get info about book by author
    var result = [];
    for (var i=0; i<books.length; i+=1) 
      if (books[i].author.indexOf(author) > -1) 
        result.push(books[i]);
    
      if(typeof(result)!=='undefined')
        display(result);
      else
        alert("No such author!");
  };

  //TOTEST Refactor with server.js
  var searchByAuthorAndGenreAndDisplay = function(author, genre) {

    //Get info about book by author and genre
    var result = [];
    for (var i=0; i<books.length; i+=1) {
      if (books[i].author.indexOf(author) > -1 && books[i].genre.indexOf(genre) > -1) 
        result.push(books[i]);
        
      if(typeof(result)!=='undefined')
        display(result);
      else
        alert("No such author and genre!");
    
  };

  //TOTEST Refactor with server.js
  var searchByDateAndDisplay = function(date) {

    //Get info about book by date of publication
    var result = [];
    for (var i=0; i<books.length; i+=1) {
      if (books[i].dateOfPub.indexOf(date) > -1) {
        result.push(books[i]);

      if(typeof(result)!=='undefined')
        display(result);
      else
        alert("No such book published on that date! Mind the MMM-YYYY format!");
    
  };

  //TOTEST Refactor with server.js
  //Fill the sidebar dynamicaly, first check for genres, then which author belongs to where 
  var fillSidebar = function(callBack){
   
      var container = $("#accordion2");
      container.empty();

      //Checking every book to extract genre and author and build container array
      var genresAuthorsArray = [{'genre':'', 'authors':['']}]; 
      for(var i=0; i<books.length; i++){
        var found = false;
        for(var j=0; j<genresAuthorsArray.length; j++){
          if(genresAuthorsArray[j].genre.indexOf(books[i].genre) > -1) {
            for(var k=0; k<genresAuthorsArray[j].authors.length; k++){
              if(genresAuthorsArray[j].authors.indexOf(books[i].author) === -1)
                genresAuthorsArray[j].authors.push(books[i].author);
            }
            found = true;
          }
        }
        if(!found){
          genresAuthorsArray.push({'genre': books[i].genre, 'authors':['']});
          genresAuthorsArray[genresAuthorsArray.length-1].authors.push(books[i].author);
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
  };

  //Some Bookstore methods
  var fillSidebarStores = function(callBack){
    var container = $("#accordion2");
    container.empty();

    var cityStr="";
    for (var i=0; i<bookstores.length; i++){
      if(cityStr.indexOf(bookstores[i].city)===-1){
        cityStr+=bookstores[i].city+" ";
        var accGroup = $("<div></div>").addClass("accordion-group");
        var accHeading = $("<div></div>").addClass("accordion-heading");
        var accToggle = $("<a></a>").addClass("accordion-toggle bookstores")
                        .text(bookstores[i].city)
                        .prop({'href':'#collapse'+bookstores[i].city});
        
        //For some reason prop is not working with custom tags
        accToggle.attr({'data-toggle':'collapse','data-parent':'#accordion2','city':bookstores[i].city});

        accHeading.append(accToggle); accGroup.append(accHeading);
        container.append(accGroup);
      }
    }
    callBack();
  };

  //Use only to display bookstores (check model)
  var displayStore = function(data){
    var container = $("#inner-content");
    container.empty();

    for (var i=0; i<data.length; i+=1){
      var row1 = $("<div></div>").addClass("row item");
      var cellMap = $("<div></div>").addClass("col-md-3 items map-canvas google-map"+i);
          cellMap.attr({'id':data[i].name});

      var cellName = $("<div></div>").addClass("col-md-3 items").text(data[i].name);
      var cellInfo = $("<div></div>").addClass("col-md-3 items").text(data[i].info);
      row1.append(cellMap).append(cellName).append(cellInfo);

      var row2 = $("<div></div>").addClass("row item");
      var cellPhone = $("<div></div>").addClass("col-md-3 items").text(data[i].phone);
      var cellWorkTime = $("<div></div>").addClass("col-md-3 items").text(data[i].workingTime);

      var booksStr = "";
      for(var j=0; j<data[i].booksInStore.length; j++)
        booksStr+=data[i].booksInStore[j] + ' ';
      var cellBooksStore = $("<div></div>").addClass("col-md-3 items").text(booksStr);

      row2.append(cellPhone).append(cellWorkTime).append(cellBooksStore);

      container.append(row1).append(row2);
    }
  };

  //You can try searching for key-value pair, instead of making hundreds of methods
  //Also for the book methods
  var searchStoreByBookAndDisplay = function(title){
    var result = [];

    for (var i=0; i<bookstores.length; i++){
      var found = false;
      for (var j=0; j<bookstores[i].booksInStore.length; j++)
        if(title===bookstores[i].booksInStore[j]){
          found = true; break;
        }
      if(found)
        result.push(bookstores[i]);
    }
    displayStore(result);
    return (result);
  };

  var searchStoreByCityAndDisplay = function(city){
    var result = [];

    for (var i=0; i<bookstores.length; i++){
      if(city===bookstores[i].city)
        result.push(bookstores[i]);
    }
    displayStore(result);
    return (result);
  };

  // public api
  return {
    displayList: displayList,
    displayImgReviewPrice: displayImgReviewPrice,
    searchByTitleAndDisplay: searchByTitleAndDisplay,
    searchByAuthorAndDisplay: searchByAuthorAndDisplay,
    searchByAuthorAndGenreAndDisplay: searchByAuthorAndGenreAndDisplay,
    searchByDateAndDisplay: searchByDateAndDisplay,
    searchForPromoAndDisplay: searchForPromoAndDisplay,
    displayMostSelled: displayMostSelled,
    displayTopRated: displayTopRated,
    fillSidebar:fillSidebar,
    fillSidebarStores:fillSidebarStores,
    displayStore:displayStore,
    searchStoreByBookAndDisplay:searchStoreByBookAndDisplay,
    searchStoreByCityAndDisplay:searchStoreByCityAndDisplay
  };
})();