"use strict";

import 'apple-mapkit-js';
import 'apple-mapkit-js/contains';

mapkit.draw = function( map, element ) {
	map.innerHTML = '';
	const mapType = element.dataset.mapType;
	const showsMapTypeControl = element.dataset.showsMapTypeControl;
	const showsZoomControl = element.dataset.showsZoomControl;
	const pointLongitude = parseFloat(element.dataset.pointLongitude);
	const pointLatitude = parseFloat(element.dataset.pointLatitude);
	const pointTitle = element.dataset.pointTitle;
	const pointSubtitle = element.dataset.pointSubtitle;
	const pointGlyphText = element.dataset.pointGlyphText;
	const pointColor = element.dataset.pointColor;

	map.mapType = mapType;
	map.showsMapTypeControl = showsMapTypeControl;
	map.showsCompass = mapkit.FeatureVisibility.Adaptive;
	map.showsZoomControl = showsZoomControl;

	if (pointLongitude && pointLatitude) {
		const work = new mapkit.Coordinate(pointLatitude, pointLongitude);
		const workAnnotation = new mapkit.MarkerAnnotation(work);

		workAnnotation.color = pointColor; 
		workAnnotation.title = pointTitle;
		workAnnotation.subtitle = pointSubtitle;
		workAnnotation.selected = "true";
		workAnnotation.glyphText = pointGlyphText;    
		map.showItems(
			[workAnnotation],
			{ 
				animate: true,
				padding: new mapkit.Padding(800, 200, 800, 200)
			}
		);
	}
}

wp.domReady( function() {
	mapkit.init({
		authorizationCallback: function(done) {
			const url = `${window.location.origin}/wp-json/AppleMapKit/v1/GetJWT/`;
			fetch( url, {
				method: "GET",
				headers: {
					Accept: 'text/plain',
				},
			},)
			.then(function(response) {
				if (response.status >= 200 && response.status < 400 ) {
					return response.text();
				}
				else {
					throw `Response resulted in error ${response.status}`;
				}
			})
			.then(function(result) {
				done(result)
			});
		}
	})
	const mapElements = document.querySelectorAll('.wp-block-mapkitjs-map');
	// debugger;
	mapElements.forEach( element => {
		const map = new mapkit.Map( element );
		mapkit.draw( map, element );
	})
} )
