"use strict"
// on document ready
$( document ).ready(function(){
   // init stuff here

    $('.date > p').bind('click', function(){
    	var date = $(this).attr('id');
    	BooksApp.searchByDateAndDisplay(date);
    });
})