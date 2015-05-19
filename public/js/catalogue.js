"use strict"
// on document ready
$( document ).ready(function(){
   // init stuff here
   $("button#button-search").click(function() {
		BooksApp.searchByTitleAndDisplay($("input#search-title").val());
	});

    $('.author').bind('click', function(){
    	var name = $(this).attr('id');
    	BooksApp.searchByAuthorAndDisplay(name);
    });
})


