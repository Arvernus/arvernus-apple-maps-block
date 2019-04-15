/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';

window.mapkit.draw = function( map, element ) {
	map.innerHTML = '';
	const mapType = element.dataset.mapType;
	const showsMapTypeControl = element.dataset.showsMapTypeControl;
	const showsZoomControl = element.dataset.showsZoomControl;
	const pointLongitude = parseFloat( element.dataset.pointLongitude );
	const pointLatitude = parseFloat( element.dataset.pointLatitude );
	const pointTitle = element.dataset.pointTitle;
	const pointSubtitle = element.dataset.pointSubtitle;
	const pointGlyphText = element.dataset.pointGlyphText;
	const pointColor = element.dataset.pointColor;

	map.mapType = mapType;
	map.showsMapTypeControl = showsMapTypeControl;
	map.showsCompass = window.mapkit.FeatureVisibility.Adaptive;
	map.showsZoomControl = showsZoomControl;

	if ( pointLongitude && pointLatitude ) {
		const work = new window.mapkit.Coordinate( pointLatitude, pointLongitude );
		const workAnnotation = new window.mapkit.MarkerAnnotation( work );

		workAnnotation.color = pointColor;
		workAnnotation.title = pointTitle;
		workAnnotation.subtitle = pointSubtitle;
		workAnnotation.selected = 'true';
		workAnnotation.glyphText = pointGlyphText;
		map.showItems( [ workAnnotation ], {
			animate: true,
			padding: new window.mapkit.Padding( 800, 200, 800, 200 ),
		} );
	}
};

domReady( function() {
	window.mapkit.init( {
		authorizationCallback( done ) {
			apiFetch( { path: 'AppleMapKit/v1/GetJWT/' } )
				.then( done )
				.catch();
		},
	} );
	const mapElements = document.querySelectorAll( '.wp-block-mapkitjs-map' );

	mapElements.forEach( ( element ) => {
		const map = new window.mapkit.Map( element );
		window.mapkit.draw( map, element );
	} );
} );
