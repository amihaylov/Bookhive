"use strict"
// on document ready
$( document ).ready(function(){
   // init stuff here
	BooksApp.displayImgReviewPrice();

    $('.author').bind('click', function(){
    	var name = $(this).attr('id');
    	BooksApp.searchByAuthorAndDisplay(name);
    });
})