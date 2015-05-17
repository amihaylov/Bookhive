"use strict"
// on document ready
$( document ).ready(function(){
   // init stuff here
   $("button#button-search").click(function() {
		BooksApp.searchByTitleAndDisplay($("input#search-title").val());
	});
})


