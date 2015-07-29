"use strict"
// on document ready
$( document ).ready(function(){
   // init stuff here


	BooksApp.displayStoreAdmin();
   
   $("button#reset-button").click(function(){
       $("input#store-name").val('');
       $("input#store-city").val('');
       $("input#store-info").val('');
       $("input#store-phone").val('');
       $("input#store-worktime").val('');
       $("input#store-books").val('');
       $("input#store-latitude").val('');
       $("input#store-longitude").val('');
   });       

   // bind add task to BooksApp.addBook
   $("button#create-button").click(function(){
   	var store = {name: $("input#store-name").val(),
   				   city: $("input#store-city").val(),
             info: $("input#store-info").val(),
   				   phone: $("input#store-phone").val(),
             workingTime: $("input#store-worktime").val(),
             booksInStore: $("input#store-books").val().split(";"),
             latitude: $("input#store-latitude").val(),
             longitude: $("input#store-longitude").val()};

   	BooksApp.addStore(store);
    BooksApp.displayStoreAdmin();
   });

   // bind update task to BooksApp.updateBook
    $("body").on("click", ".edit-store", function(){
      var name = $(this).prop('name');
      
      var store = {name: $("input#store-name").val(),
             city: $("input#store-city").val(),
             info: $("input#store-info").val(),
             phone: $("input#store-phone").val(),
             workingTime: $("input#store-worktime").val(),
             booksInStore: $("input#store-books").val().split(";"),
             latitude: $("input#store-latitude").val(),
             longitude: $("input#store-longitude").val()};    

      BooksApp.updateStore(store,name);
      BooksApp.displayStoreAdmin();
   });

   // bind delete task to BooksApp.deleteBook
  $("body").on("click", ".delete-store", function(){
      var id = $(this).prop('name');
      var store = {name: id};

      BooksApp.deleteStore(store,id);
      BooksApp.displayStoreAdmin();
   });
})


