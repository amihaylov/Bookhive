"use strict"
// on document ready
$( document ).ready(function(){
   // init stuff here
	var now = new Date();
	if (now.getMonth>9)
		{BooksApp.searchByDateAndDisplay(now.getFullYear() + '-' + (now.getMonth()+1));}
	else
		{BooksApp.searchByDateAndDisplay(now.getFullYear() + '-0' + (now.getMonth()+1));}

	$('.date > p').bind('click', function(){
		var date = $(this).attr('id');
		BooksApp.searchByDateAndDisplay(date);
	});
})