"use strict"
// on document ready
$( document ).ready(function(){
   // init stuff here
	BooksApp.displayList();

   // bind add task to BooksApp.addBook
   $("button#create-button").click(function(){
   	var book = {title: $("input#book-title").val(),
   				   author: $("input#book-author").val(),
   				   imgSrc: $("input#book-imgsrc").val(),
                  review: $("input#book-review").val(),
                  price: $("input#book-price").val(),
                  dateOfPub: $("input#book-dateofpub").val(),
                  rating: $("input#book-rating").val(),
                  numOfSales: $("input#book-numofsales").val(),
                  promotion: $("input#book-promotion").val() };		   
   	BooksApp.addBook(book);
      BooksApp.displayList();
   });

   // bind update task to BooksApp.updateBook
   $("button#update-button").click(function(){
      var book = {title: $("input#book-title").val(),
                  author: $("input#book-author").val(),
                  imgSrc: $("input#book-imgsrc").val(),
                  review: $("input#book-review").val(),
                  price: $("input#book-price").val(),
                  dateOfPub: $("input#book-dateofpub").val(),
                  rating: $("input#book-rating").val(),
                  numOfSales: $("input#book-numofsales").val(),
                  promotion: $("input#book-promotion").val() };       
      BooksApp.updateBook(book);
      BooksApp.displayList();
   });

   // bind delete task to BooksApp.deleteBook
   $("button#delete-button").click(function(){
      var book = {title: $("input#book-title").val(),
                  author: $("input#book-author").val(),
                  imgSrc: $("input#book-imgsrc").val(),
                  review: $("input#book-review").val(),
                  price: $("input#book-price").val(),
                  dateOfPub: $("input#book-dateofpub").val(),
                  rating: $("input#book-rating").val(),
                  numOfSales: $("input#book-numofsales").val(),
                  promotion: $("input#book-promotion").val() };        
      BooksApp.deleteBook(book);
      BooksApp.displayList();
   });
})


