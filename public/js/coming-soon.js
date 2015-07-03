"use strict"
// on document ready
$( document ).ready(function(){
   // init stuff here
	var now = new Date();

	  var container = $("#accordion2");
      container.empty();

	  var months = {'Jan':'January','Feb':'February','Mar':'March','Apr':'April',
	  				'May':'May','Jun':'June','Jul':'July','Aug':'August',
	  				'Sep':'September','Oct':'October','Nov':'November','Dec':'December'};
	  
	  //Build sidebar menu from month array for 3 years ahead, starting from current
	  for(var i=0; i<3; i++){
	  	var year = now.getFullYear()+i;
	    var accGroup = $("<div></div>").addClass("accordion-group");
	    var accHeading = $("<div></div>").addClass("accordion-heading");
	    var accToggle = $("<a></a>").addClass("accordion-toggle date")
	                    .text(year)
	                    .prop({'href':'#collapse'+year});
	    
	    //For some reason prop is not working with custom tags
	    accToggle.attr({'data-toggle':'collapse','data-parent':'#accordion2','year':year});

	    accHeading.append(accToggle); accGroup.append(accHeading);

	    var accBody = $("<div></div>").addClass("accordion-body collapse")
	            .prop({'id':'collapse'+year});
	    var accInner = $("<div></div>").addClass("accordion-inner")

	    for(var abbreviation in months){
	      var monthsParagr = $("<p></p>").addClass("date")
	                          .text(months[abbreviation])
	                          .prop({'id':abbreviation});
	      monthsParagr.attr('year',year)
	      accInner.append(monthsParagr);
	    }
	    accBody.append(accInner);
	    accGroup.append(accBody);
	    container.append(accGroup);
	  }

	BooksApp.searchByDateAndDisplay(now.getFullYear());

	$('.date').bind('click', function(){
		var month = $(this).attr('id');
		var year = $(this).attr('year');
		//If month is falsy (for Year only link) make it empty
		if(!month) month="";
		var searchString = month + '-' +year;
		BooksApp.searchByDateAndDisplay(searchString);
	});
})