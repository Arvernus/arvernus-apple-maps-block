/**
 * WordPress dependencies
 */
import { useState, useEffect, createRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const AppleMap = ( props ) => {
	const mapDomNode = createRef();

	const [ appleMapState, setAppleMap ] = useState();
	const [ markerCoordinate, setMarkerCoordinate ] = useState();
	const [ markerAnnotation, setMarkerAnnotation ] = useState();

	const {
		pointLatitude,
		pointLongitude,
		pointColor,
		pointTitle,
		pointSubtitle,
		pointGlyphText,
		mapType,
		showsMapTypeControl,
		showsZoomControl,
		className,
		showsCompass,
	} = props;

	// initialize map
	useEffect( () => {
		window.mapkit.init( {
			authorizationCallback( done ) {
				apiFetch( { path: '/AppleMapKit/v1/GetJWT/' } )
					.then( done )
					.catch();
			},
		} );

		const newMarkerCoordinate = new window.mapkit.Coordinate(
			Number.parseFloat( pointLatitude ),
			Number.parseFloat( pointLongitude )
		);

		const newMarkerAnnotation = new window.mapkit.MarkerAnnotation(
			newMarkerCoordinate
		);
		newMarkerAnnotation.color = pointColor;
		newMarkerAnnotation.title = pointTitle;
		newMarkerAnnotation.subtitle = pointSubtitle;
		newMarkerAnnotation.selected = 'true';
		newMarkerAnnotation.glyphText = pointGlyphText;

		const newAppleMap = new window.mapkit.Map( mapDomNode.current );
		newAppleMap.mapType = mapType;
		newAppleMap.showsMapTypeControl = showsMapTypeControl;
		newAppleMap.showsCompass = window.mapkit.FeatureVisibility.Adaptive;
		newAppleMap.showsZoomControl = showsZoomControl;
		newAppleMap.showItems( [ newMarkerAnnotation ], {
			animate: true,
			padding: new window.mapkit.Padding( 800, 200, 800, 200 ),
		} );
		setAppleMap( newAppleMap );
		setMarkerAnnotation( newMarkerAnnotation );
		setMarkerCoordinate( newMarkerCoordinate );
	}, [] );

	// update map
	useEffect( () => {
		if ( markerAnnotation && appleMapState && markerCoordinate ) {
			const newLocation = new window.mapkit.Coordinate(
				Number.parseFloat( pointLatitude ),
				Number.parseFloat( pointLongitude )
			);

			let newMarkerCoordinate = markerCoordinate;

			if (
				! (
					newMarkerCoordinate.latitude === newLocation.latitude &&
				newMarkerCoordinate.longitude === newLocation.longitude
				)
			) {
				newMarkerCoordinate = newLocation;
			}

			const newMarkerAnnotation = markerAnnotation;
			newMarkerAnnotation.coordinate = newMarkerCoordinate;
			newMarkerAnnotation.color = pointColor;
			newMarkerAnnotation.title = pointTitle;
			newMarkerAnnotation.subtitle = pointSubtitle;
			newMarkerAnnotation.selected = 'true';
			newMarkerAnnotation.glyphText = pointGlyphText;

			const newAppleMap = appleMapState;
			newAppleMap.mapType = mapType;
			newAppleMap.showsMapTypeControl = showsMapTypeControl;
			newAppleMap.showsCompass = window.mapkit.FeatureVisibility.Adaptive;
			newAppleMap.showsZoomControl = showsZoomControl;
			newAppleMap.showItems( [ markerAnnotation ], {
				animate: true,
				padding: new window.mapkit.Padding( 800, 200, 800, 200 ),
			} );
		}
	}, [ pointLatitude,
		pointLongitude,
		pointColor,
		pointTitle,
		pointSubtitle,
		pointGlyphText,
		mapType,
		showsMapTypeControl,
		showsZoomControl ] );

	return (
		<div ref={ mapDomNode }
			className={ className }
			id="map"
			data-shows-map-type-control={ showsMapTypeControl }
			data-shows-compass={ showsCompass }
			data-shows-zoom-controll={ showsZoomControl }
			data-map-type={ mapType }
			data-point-title={ pointTitle }
			data-point-subtitle={ pointSubtitle }
			data-point-glyph-text={ pointGlyphText }
			data-point-latitude={ pointLatitude }
			data-point-longitude={ pointLongitude }
			data-point-color={ pointColor }
		/>
	);
};

export default AppleMap;
