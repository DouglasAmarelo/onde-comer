var map;
var service;
var infowindow;

function initialize() {
	var jussi = new google.maps.LatLng(-23.583638, -46.6759948);

	map = new google.maps.Map(document.getElementById('map'), {
		center: jussi,
		zoom: 16
	});

	var request = {
		location: jussi,
		radius: '1000',
		// keyword: ['restaurante']
		types: ['restaurante']
	};

	service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);
}

function callback(results, status) {
	if (status !== google.maps.places.PlacesServiceStatus.OK) {
		console.error(status);
		return;
	}

	console.log( results.length);

	for (var i = 0, len = results.length; i < len; i++) {
		var place = results[i];
		createMarker(results[i]);

		console.log('# results', place.name );
	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}

google.maps.event.addDomListener(window, 'load', initialize);




