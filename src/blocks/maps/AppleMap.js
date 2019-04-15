/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * External dependencies
 */
import React from 'react';

class AppleMap extends Component {
	constructor( props ) {
		super( props );
		this.mapDomNode = React.createRef();
		this.state = {
			appleMap: {},
			markerCoordinate: {},
			markerAnnotation: {},
		};
	}
	componentDidMount() {
		window.mapkit.init( {
			authorizationCallback( done ) {
				apiFetch( { path: '/AppleMapKit/v1/GetJWT/' } )
					.then( done )
					.catch();
			},
		} );

		const markerCoordinate = new window.mapkit.Coordinate(
			Number.parseFloat( this.props.pointLatitude ),
			Number.parseFloat( this.props.pointLongitude )
		);

		const markerAnnotation = new window.mapkit.MarkerAnnotation( markerCoordinate );
		markerAnnotation.color = this.props.pointColor;
		markerAnnotation.title = this.props.pointTitle;
		markerAnnotation.subtitle = this.props.pointSubtitle;
		markerAnnotation.selected = 'true';
		markerAnnotation.glyphText = this.props.pointGlyphText;
		const appleMap = new window.mapkit.Map( this.mapDomNode.current );
		appleMap.mapType = this.props.mapType;
		appleMap.showsMapTypeControl = this.props.showsMapTypeControl;
		appleMap.showsCompass = window.mapkit.FeatureVisibility.Adaptive;
		appleMap.showsZoomControl = this.props.showsZoomControl;
		appleMap.showItems( [ markerAnnotation ], {
			animate: true,
			padding: new window.mapkit.Padding( 800, 200, 800, 200 ),
		} );
		this.setState( {
			appleMap,
			markerAnnotation,
			markerCoordinate,
		} );
	}
	componentDidUpdate() {
		const newLocation = new window.mapkit.Coordinate(
			Number.parseFloat( this.props.pointLatitude ),
			Number.parseFloat( this.props.pointLongitude )
		);

		let markerCoordinate = this.state.markerCoordinate;

		if (
			! (
				markerCoordinate.latitude === newLocation.latitude &&
				markerCoordinate.longitude === newLocation.longitude
			)
		) {
			markerCoordinate = newLocation;
		}

		const markerAnnotation = this.state.markerAnnotation;
		markerAnnotation.coordinate = markerCoordinate;
		markerAnnotation.color = this.props.pointColor;
		markerAnnotation.title = this.props.pointTitle;
		markerAnnotation.subtitle = this.props.pointSubtitle;
		markerAnnotation.selected = 'true';
		markerAnnotation.glyphText = this.props.pointGlyphText;

		const appleMap = this.state.appleMap;
		appleMap.mapType = this.props.mapType;
		appleMap.showsMapTypeControl = this.props.showsMapTypeControl;
		appleMap.showsCompass = window.mapkit.FeatureVisibility.Adaptive;
		appleMap.showsZoomControl = this.props.showsZoomControl;
		appleMap.showItems( [ markerAnnotation ], {
			animate: true,
			padding: new window.mapkit.Padding( 800, 200, 800, 200 ),
		} );
	}
	render() {
		return (
			<div
				ref={ this.mapDomNode }
				className={ this.props.className }
				id="map"
				data-shows-map-type-control={ this.props.showsMapTypeControl }
				data-shows-compass={ this.props.showsCompass }
				data-shows-zoom-controll={ this.props.showsZoomControl }
				data-map-type={ this.props.mapType }
				data-point-title={ this.props.pointTitle }
				data-point-subtitle={ this.props.pointSubtitle }
				data-point-glyph-text={ this.props.pointGlyphText }
				data-point-latitude={ this.props.pointLatitude }
				data-point-longitude={ this.props.pointLongitude }
				data-point-color={ this.props.pointColor }
			/>
		);
	}
}

export default AppleMap;
