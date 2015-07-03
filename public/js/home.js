"use strict"
// on document ready
$( document ).ready(function(){
   // init stuff here
	BooksApp.displayImgReviewPrice();
	BooksApp.fillSidebar(function(){
	    $('.author').bind('click', function(){
	    	var name = $(this).attr('id');
	    	var genre = $(this).attr('genre');
	    	BooksApp.searchByAuthorAndGenreAndDisplay(name,genre);
	    });
	});
})