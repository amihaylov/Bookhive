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


    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      },
      stop: function(event, ui) {
      	BooksApp.searchByPriceRangeAndDisplay({minPrice: ui.values[0], maxPrice: ui.values[1]});
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );

    $("#star-slider").raty({
	  click: function(score, evt) {
	    alert('ID: ' + this.id + "\nscore: " + score + "\nevent: " + evt);
	    BooksApp.searchByRatingAndDisplay(score);
	  }
	});

})