"use strict";

import 'apple-mapkit-js';
import 'apple-mapkit-js/contains';

var map, mapNode;
var workAnnotation, work, pointLongitude, pointLatitude, pointTitle, pointSubtitle, pointGlyphText, pointColor, mapType, showsMapTypeControl;
mapkit.customDraw = function() {
	mapType = mapNode.dataset.mapType;
	showsMapTypeControl = mapNode.dataset.showsMapTypeControl;
	pointLongitude = parseFloat(mapNode.dataset.pointLongitude);
	pointLatitude = parseFloat(mapNode.dataset.pointLatitude);
	pointTitle = mapNode.dataset.pointTitle;
	pointSubtitle = mapNode.dataset.pointSubtitle;
	pointGlyphText = mapNode.dataset.pointGlyphText;
	pointColor = mapNode.dataset.pointColor;

	map.mapType = mapType;
	map.showsMapTypeControl = showsMapTypeControl;
	// map.showsCompass = 'hidden';
	// map.showsZoomControl = false;

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

mapkit.customRedraw = function(latitude, longitude, title, subtitle, glyphText, color) {
	workAnnotation.coordinate = new mapkit.Coordinate(parseFloat(latitude), parseFloat(longitude));
	workAnnotation.color = color; 
	workAnnotation.title = title;
	workAnnotation.subtitle = subtitle;
	workAnnotation.selected = "true";
	workAnnotation.glyphText = glyphText;
	map.removeItems([workAnnotation]);
	map.showItems([workAnnotation]);
}

document.addEventListener('readystatechange', function(event) {
	if (event.target.readyState === "interactive") {
		mapkit.init({
			authorizationCallback: function(done) {
				fetch("https://arvernus.info/wp-json/AppleMapKit/v1/GetJWT/", {
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
		mapkit.customDraw();
	}
}, false );