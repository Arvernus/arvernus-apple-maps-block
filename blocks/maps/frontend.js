"use strict";

import 'apple-mapkit-js';
import 'apple-mapkit-js/contains';

var map, mapNode, workAnnotation, work, pointLongitude, pointLatitude, pointTitle, pointSubtitle, pointGlyphText, pointColor, mapType, showsMapTypeControl;
mapkit.draw = function( map ) {
	console.log(map);
	map.innerHTML = '';
	mapType = mapNode.dataset.mapType;
	showsMapTypeControl = mapNode.dataset.showsMapTypeControl;
	showsZoomControl = mapNode.dataset.showsZoomControl;
	pointLongitude = parseFloat(mapNode.dataset.pointLongitude);
	pointLatitude = parseFloat(mapNode.dataset.pointLatitude);
	pointTitle = mapNode.dataset.pointTitle;
	pointSubtitle = mapNode.dataset.pointSubtitle;
	pointGlyphText = mapNode.dataset.pointGlyphText;
	pointColor = mapNode.dataset.pointColor;

	map.mapType = mapType;
	map.showsMapTypeControl = showsMapTypeControl;
	map.showsCompass = mapkit.FeatureVisibility.Adaptive;
	map.showsZoomControl = showsZoomControl;

	if (pointLongitude && pointLatitude) {
		work = new mapkit.Coordinate(pointLatitude, pointLongitude);
		workAnnotation = new mapkit.MarkerAnnotation(work);

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

document.addEventListener('readystatechange', function(event) {
	if (event.target.readyState === "interactive") {
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
		});
	}
	if (event.target.readyState === "complete") {
		mapNode = document.querySelector('#map');
		map = new mapkit.Map(mapNode);
		mapkit.draw( map );
	}
}, false );