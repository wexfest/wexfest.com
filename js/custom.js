$(document).ready(function() {

	var urlParams;
	(window.onpopstate = function () {
	    var match,
	        pl     = /\+/g,  // Regex for replacing addition symbol with a space
	        search = /([^&=]+)=?([^&]*)/g,
	        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
	        query  = window.location.search.substring(1);

	    urlParams = {};
	    while (match = search.exec(query))
	       urlParams[decode(match[1])] = decode(match[2]);
	})();

	function getUrlParams(){
		return urlParams;
	}

	if (urlParams.id){
		$(".rsvp").show();
	}


	/*-----------------------------------------------------------------------------------*/
	/*	Smooth Scroll
	/*  Thanks to: https://github.com/davist11/jQuery-One-Page-Nav
	/*-----------------------------------------------------------------------------------*/

	function smoothScroll(){
		$(".nav").onePageNav({
			filter: ':not(.external)',
			scrollSpeed: 1500
		});

		var formTarget = $(".js-form"); // Assign this class to corresponding section on Index.html

		// Scrolls to form section
		$(".js-scroll").on("click", function() {
			$('html, body').animate({
				scrollTop: formTarget.offset().top
			}, 2000);
			return false;
		});

		return false;
	}

	smoothScroll();

	/*-----------------------------------------------------------------------------------*/
	/*	Flexslider
	/*  Thanks to: http://www.woothemes.com/flexslider/
	/*-----------------------------------------------------------------------------------*/

	function flexSlider(){
		$('.flexslider').flexslider({
			animation: "slide",
			slideshow: false,
			touch: true
		});
	}

	flexSlider();

	/*-----------------------------------------------------------------------------------*/
	/*	RSVP Form Validation + Submission
	/*-----------------------------------------------------------------------------------*/

	function rsvpFormSubmit() {

		// this is the id of the form
		var formID = $("#js-form");

		// submits form with ajax method
		formID.on("submit", function() {

			$.ajax({
				url: "mailer.php",
				type: "POST",
		        data: formID.serialize(), // serializes the form's elements.

		        success: function(data) {
		        	$(".js-display")
		        				.addClass("message-panel")
		        				.html(data); // show response from the php script.
		        }

		    });

		    return false; // avoid to execute the actual submit of the form.

		});

		// Show/Hide RSVP Menu selection on accept/decline
		$(".decline").on("click", function(){
			$(".rsvp-meal-choice").fadeOut();
		});
		$(".accept").on("click", function(){
			$(".rsvp-meal-choice").fadeIn();
		});

	}
	rsvpFormSubmit();


});

/*-----------------------------------------------------------------------------------*/
/*	Google Map API
/*  Credit to: http://stiern.com/tutorials/adding-custom-google-maps-to-your-website/
/*-----------------------------------------------------------------------------------*/

var map;
var myLatlng = new google.maps.LatLng(50.999242, -118.194485); // Specify YOUR coordinates

var MY_MAPTYPE_ID = 'custom_style';

function initialize() {

	/*----------------------------------------------------------------------------*/
	/* Creates a custom color scheme for map
	/* For details on styling go to the link below:
	/* http://www.evoluted.net/thinktank/web-design/custom-google-maps-style-tool */
	/*----------------------------------------------------------------------------*/

	var featureOpts = [
		{
			"featureType": "road",
			"stylers": [
				{ "hue": "#f4ef8a" },
				{ "gamma": 0.82 },
				{ "visibility": "on" },
				{ "saturation": 62 },
				{ "lightness": -7 }
			]
		},{
			"featureType": "poi",
			"stylers": [
				{ "hue": "#f4ef8a" },
				{ "lightness": 14 }
			]
		},{
			"stylers": [
				{ "hue": "#f4ef8a" }
			]
		}
	]

	var mapOptions = {
		zoom: 18,
		center: myLatlng,
		disableDefaultUI: true,
		scrollwheel: false,
		draggable: true,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
		},
		mapTypeId: MY_MAPTYPE_ID
	};

	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

	var styledMapOptions = {
		name: 'Custom Style'
	};

	var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

	var image = new google.maps.MarkerImage("img/map-marker@2x.png", null, null, null, new google.maps.Size(55,57));

	// Includes custom marker on map
	var myLatLng = new google.maps.LatLng(50.999242, -118.194485);
	var beachMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image
	});

	map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
}

google.maps.event.addDomListener(window, 'load', initialize);
