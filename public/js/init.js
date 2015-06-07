"use strict"
// on document ready
$( document ).ready(function(){
   // init stuff here
	BooksApp.displayList();
   
   $("button#reset-button").click(function(){
       $("input#book-title").val('');
       $("input#book-author").val('');
       $("input#book-imgsrc").val('');
       $("input#book-review").val('');
       $("input#book-price").val('');
       $("input#book-dateofpub").val('');
       $("input#book-rating").val('');
       $("input#book-numofsales").val('');
       $("input#book-promotions").val(''); 
   });       

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
                  promotions: $("input#book-promotions").val() };		   
   	BooksApp.addBook(book);
      BooksApp.displayList();
   });

   // bind update task to BooksApp.updateBook
    $("body").on("click", ".edit-book", function(){
      var id = $(this).prop('name');
      console.log(id);
      var book = {title: $("input#book-title").val(),
                  author: $("input#book-author").val(),
                  imgSrc: $("input#book-imgsrc").val(),
                  review: $("input#book-review").val(),
                  price: $("input#book-price").val(),
                  dateOfPub: $("input#book-dateofpub").val(),
                  rating: $("input#book-rating").val(),
                  numOfSales: $("input#book-numofsales").val(),
                  promotions: $("input#book-promotions").val() }; 
      console.log(book);      
      BooksApp.updateBook(book,id);
      BooksApp.displayList();
   });

   // bind delete task to BooksApp.deleteBook
  $("body").on("click", ".delete-book", function(){
      var id = $(this).prop('name');
      var book = {title: id};

      BooksApp.deleteBook(book,id);
      BooksApp.displayList();
   });
})


