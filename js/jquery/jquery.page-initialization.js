(function($) {
	var myLocation;
	var methods = {
		page1: function() {
			$("#button-submit").on("click", function() {
				$.mobile.changePage("#page2");
				return false;
			})
			
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position){
					myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				},
				function(error){
					// TODO: Use a jQuery Mobile error page for this.
					alert("An error occurred in the geolocator.");
				});
			} else {
				// TODO: Use a jQuery Mobile error page for this.
				alert("Geolocation is not supported by this browser");
			}
			
		},
		page2: function() {
			// Create a new map every time we show page 2
			$("#page2").on("pageshow", function() {

				// Create a new map centered on current location
				var map = new google.maps.Map(document.getElementById('map'), {
					mapTypeId : google.maps.MapTypeId.ROADMAP,
					center : myLocation,
					zoom : 13
				});

				// Special marker for current location: make it green
				var homeMarker = new google.maps.Marker({
					map: map,
					position: myLocation, 
					title: "YOU ARE HERE"
				})
				iconFile = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
				homeMarker.setIcon(iconFile);
				
				// What are we searching for?
				var strFood = $("#form-select-food :checked").val();
				
				// Set up the search request
				var request = {
					location : myLocation,
					radius : 500,
					query : strFood
				};
				
				// Infowindow popup when user clicks on a map marker
				var infowindow = new google.maps.InfoWindow();
				
				// Initiate the search
				var service = new google.maps.places.PlacesService(map);
				service.textSearch(request, callback);
				
				function callback(results, status) {
					// Is the status ok?
					if(status == google.maps.places.PlacesServiceStatus.OK) {
						// For each result, add a marker
						for(var i = 0; i < results.length; i++) {
							createMarker(results[i]);
						}
					}
				}
				
				function createMarker(place) {
					// Add a new marker to represent the place
					var placeLoc = place.geometry.location;
					var marker = new google.maps.Marker({
						map : map,
						position : place.geometry.location,
						title: place.name
					});
				
					// Add a click listener to pop up the infowindow
					google.maps.event.addListener(marker, 'click', function() {
						infowindow.setContent(place.name);
						infowindow.open(map, this);
					});
				}
				
			})
		}
	};
	
	$.fn.pageInitialize = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
			return methods.page1.apply( this, arguments );
	    } else {
			alert( 'Method ' +  method + ' does not exist on jQuery.pageInitialize' );
	    } 
	}
})(jQuery);