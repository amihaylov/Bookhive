"use strict"
// on document ready
$( document ).ready(function(){
   // init stuff here
   	BooksApp.fillSidebar(function(){
	    $('.author').bind('click', function(){
	    	var name = $(this).attr('id');
	    	var genre = $(this).attr('genre');
	    	BooksApp.searchByAuthorAndGenreAndDisplay(name,genre);
	    });
	});

   $("button#button-search").click(function() {
   		if($('.radio-author').is(':checked')) 
			BooksApp.searchByAuthorAndDisplay($("input#search-title").val());
		else
			BooksApp.searchByTitleAndDisplay($("input#search-title").val());
	});
})


