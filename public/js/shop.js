"use strict"
// on document ready
$( document ).ready(function(){
   // init stuff here
   
   $("#promo").click(function() {
		BooksApp.searchForPromoAndDisplay();
	});
   $("#most-selled").click(function() {
		BooksApp.displayMostSelled();
	});
   $("#top-rated").click(function() {
		BooksApp.displayTopRated();
	});
})