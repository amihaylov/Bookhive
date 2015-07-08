var BooksApp = (function() {

  //Title must be unique!
  var books = BooksData.getData();
  //console.log(books);

  //Name must be unique!
  var bookstores =[{name:'Booktrading, Sofia',city:'Sofia',info:'Sofia, Graff Ignatiev str. 50; booktrading@book.com'
  ,phone:'0882 907 212',workingTime:'Mon-Fri 08-19; Sat closed; Sun - closed',booksInStore:['It','1984'],latitude:42.689295,longitude:23.327590},
  {name:'Booktrading, Varna',city:'Varna',info:'Varna, bul. Vladislav Varnenchik 258; booktrading@book.com'
  ,phone:'0886 418 559',workingTime:'Mon-Fri 08-19; Sat 10-17; Sun - closed',booksInStore:['It'],latitude:43.2221833,longitude:27.8766342},
  {name:'Penguins, Plovdiv',city:'Plovdiv',info:'Sofia, Vitoshka str. 30; penguins@book.com'
  ,phone:'070017661',workingTime:'Mon-Fri 08-19; Sat 10-17; Sun - closed',booksInStore:['1984'],latitude:42.147232,longitude:24.751725}];

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
      display(books, false);
    
  };

  var searchForPromoAndDisplay = function(){
      var container = $("#inner-content");
      container.empty();

      //Add the database
      for (var i=0; i<books.length; i+=1){
        //Add classes TODO!
        if(typeof(books[i].promotions) !== 'undefined' || books[i].promotions.length()>0) {
          var row = $("<div></div>").addClass("row item");
          var cellImage = $("<div></div>").addClass("col-md-3 items").prepend($('<img>',{class: 'img', src: books[i].imgSrc}));
          var cellReview = $("<div></div>").addClass("col-md-3 items").text(books[i].review);
          var cellPromo = $("<div></div>").addClass("col-md-3 items").text(books[i].promotions);
          var cellPrice = $("<div></div>").addClass("col-md-3 items");
          var shoppingCart = $("<i></i>").addClass("fa fa-shopping-cart").text(books[i].price);
          cellPrice.append(shoppingCart);

          row.append(cellImage).append(cellReview).append(cellPromo).append(cellPrice);
          container.append(row);
        }
      }
  };

  //Sorting the whole data descending and returning top 5 selled items
  var displayMostSelled = function(){
      var container = $("#inner-content");
      container.empty();
      
      books.sort(function(a, b){
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
          var cellImage = $("<div></div>").addClass("col-md-3 items").prepend($('<img>',{class: 'img', src: books[i].imgSrc}));
          var cellReview = $("<div></div>").addClass("col-md-3 items").text(books[i].review);
          var cellPromo = $("<div></div>").addClass("col-md-3 items").text(books[i].promotions);
          var cellPrice = $("<div></div>").addClass("col-md-3 items");
          var shoppingCart = $("<i></i>").addClass("fa fa-shopping-cart").text(books[i].price);
          var cellNumOfSales = $("<i></i>").addClass("col-md-3 items").text(books[i].numOfSales);
          cellPrice.append(shoppingCart);

          row.append(cellImage).append(cellReview).append(cellPromo)
              .append(cellPrice).append(cellNumOfSales);
          container.append(row);
      }
  };

  var displayTopRated = function(){
    var container = $("#inner-content");
    container.empty();
    
    books.sort(function(a, b){
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
        var cellImage = $("<div></div>").addClass("col-md-3 items").prepend($('<img>',{class: 'img', src: books[i].imgSrc}));
        var cellReview = $("<div></div>").addClass("col-md-3 items").text(books[i].review);
        var cellPromo = $("<div></div>").addClass("col-md-3 items").text(books[i].promotions);
        var cellPrice = $("<div></div>").addClass("col-md-3 items");
        var shoppingCart = $("<i></i>").addClass("fa fa-shopping-cart").text(books[i].price);
        var cellRating = $("<i></i>").addClass("col-md-3 items").text(books[i].rating);
        cellPrice.append(shoppingCart);

        row.append(cellImage).append(cellReview).append(cellPromo)
            .append(cellPrice).append(cellRating);
        container.append(row);
     }
  };

  var searchByTitleAndDisplay = function(title) {

    var result = [];
    for (var i=0; i<books.length; i+=1) {
      if (books[i].title.indexOf(title) > -1) {
        result.push(books[i]);
      }
    }

      if(typeof(result)!=='undefined'){
        display(result, false);
      }
      else
        alert("No such book!");
  };

  var searchByAuthorAndDisplay = function(author) {

    var result = [];
    for (var i=0; i<books.length; i+=1) {
      if (books[i].author.indexOf(author) > -1) {
        result.push(books[i]);
      }
    }

      if(typeof(result)!=='undefined'){
        display(result, false);
      }
      else
        alert("No such author!");
  };

  var searchByAuthorAndGenreAndDisplay = function(author, genre) {

    var result = [];
    for (var i=0; i<books.length; i+=1) {
      if (books[i].author.indexOf(author) > -1 && books[i].genre.indexOf(genre) > -1) {
        result.push(books[i]);
      }
    }

      if(typeof(result)!=='undefined'){
        display(result, false);
      }
      else
        alert("No such author and genre!");
    
  };

  var searchByDateAndDisplay = function(date) {

    var result = [];
    for (var i=0; i<books.length; i+=1) {
      if (books[i].dateOfPub.indexOf(date) > -1) {
        result.push(books[i]);
      }
    }

      if(typeof(result)!=='undefined'){
        display(result, true);
      }
      else
        alert("No such book published on that date! Mind the MMM-YYYY format!");
    
  };

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
  //Google Map function

  //Use only to display bookstores (check model)
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

      var booksStr = "";
      for(var j=0; j<data[i].booksInStore.length; j++)
        booksStr+=data[i].booksInStore[j] + ' ';
      var cellBooksStore = $("<div></div>").addClass("col-md-3 items").text(booksStr)
                            .prepend($('<h4></h4>').text('Books in store:'));;

      row2.append(cellPhone).append(cellWorkTime).append(cellBooksStore);

      mainRow.append(row1).append(row2);
      container.append(mainRow);
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
    searchStoreByCityAndDisplay,searchStoreByCityAndDisplay
  };
})();
 
