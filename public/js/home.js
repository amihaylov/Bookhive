"use strict"
// on document ready
$( document ).ready(function(){
   // init stuff here
	BooksApp.displayImgReviewPrice();

/*	$(".author").click(function(){
	   		//Not working, returns undefined
   			BooksApp.searchByAuthorAndDisplay($(this).textContent);
    });*/

    $('.author').bind('click', function(){
    	var name = $(this).attr('id');
    	BooksApp.searchByAuthorAndDisplay(name);
    });
})