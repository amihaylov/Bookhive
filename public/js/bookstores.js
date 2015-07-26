"use strict"
// on document ready
$( document ).ready(function(){
   //HMTL5 Geolocation methods
	var userLocation = {};
	var globalData = [];

	function getLocation() {
    	if (navigator.geolocation)
    		navigator.geolocation.getCurrentPosition(showPosition);
	}

	function showPosition(position) {
    	userLocation.latitude = position.coords.latitude;
    	userLocation.longitude = position.coords.longitude
    	var index = checkClosest(globalData, userLocation);
		var resultArray = [];
		console.log(globalData, index);
		resultArray.push(globalData[index]);
		BooksApp.displayStore(resultArray);
		initialize(resultArray);
	}

   //Distance calculation methods, considering Earth's curvature
	function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	  var R = 6371; // Radius of the earth in km
	  var dLat = deg2rad(lat2-lat1);  // deg2rad below
	  var dLon = deg2rad(lon2-lon1); 
	  var a = 
	    Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	    Math.sin(dLon/2) * Math.sin(dLon/2)
	    ; 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	  var d = R * c; // Distance in km
	  return d;
	}

	function deg2rad(deg) {
	  return deg * (Math.PI/180)
	}

	//Check the closest point from a set to a location
	function checkClosest(set, location){
		var indexClosest;
		for(var i=0,distance; i<set.length; i++){
			if(!i){
				distance = getDistanceFromLatLonInKm(location.latitude, location.longitude
													,set[0].latitude, set[0].longitude);
				indexClosest = i;
			}
			else{
				if(distance>getDistanceFromLatLonInKm(location.latitude, location.longitude
													,set[i].latitude, set[i].longitude)){
					distance = getDistanceFromLatLonInKm(location.latitude, location.longitude
													,set[i].latitude, set[i].longitude);
					indexClosest = i;
				}
			}
		}
		return indexClosest;
	}

   // init google map
   var initialize = function(data){
   	
   	globalData=data;

	for (var i=0; i<data.length; i++){
    	var myLatlng = new google.maps.LatLng(data[i].latitude,data[i].longitude);
    	var mapOptions = {
        	zoom: 15,
        	center: myLatlng
      	}
      	var map = new google.maps.Map(document.getElementsByClassName('google-map'+i)[0], mapOptions);

      	var marker = new google.maps.Marker({
        	position: myLatlng,
        	map: map,
        	title: 'Hello World!'
      	});
   	}
   }

   BooksApp.fillSidebarStores(function(){
	    $('.bookstores').bind('click', function(){
	    	var city = $(this).attr('city');
	    	var data = BooksApp.searchStoreByCityAndDisplay(city, initialize);
	    });
	});

   
   $("button#button-search").click(function() {
		var data = BooksApp.searchStoreByBookAndDisplay($("input#search-title").val(), initialize);		
	});
	

	$("button#button-closest").click(function() {
		getLocation();		
	});
	google.maps.event.addDomListener(window, 'load', initialize); 
	
})


