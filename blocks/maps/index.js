"use strict";

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { 
	__, 
	sprintf 
} = wp.i18n;
const { 
	Fragment,
} = wp.element;
const {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	Button,
} = wp.components;
const {
  registerBlockType,
} = wp.blocks;
const {
	InspectorControls,
	withColors,
	PanelColorSettings,
} = wp.editor;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

const mapAttributes = {
	mapType: {
		type: 'string',	
		default: mapkit.Map.MapTypes.Standard,
	},
	searchQuery: {
		type: 'string',
	},
	showsMapTypeControl: {
		type: 'Boolean',
		default: true,
	},
	pointLatitude: {
		type: 'number',
		default: '37.334852',
	},
	pointLongitude: {
		type: 'number',
		default: '-122.009163',
	},
	pointTitle: {
		type: 'string',
		default: 'Title',
	},
	pointSubtitle: {
		type: 'string',
		default: 'Subtitle',
	},
	pointGlyphText: {
		type: 'string',
		default: 'T',
	},
	pointColor: {
		type: 'string',
		default: '#000000',
	}
};

const mapTypeOptions = [
	{ value: mapkit.Map.MapTypes.Satellite, label: __( 'Satellite' ) },
	{ value: mapkit.Map.MapTypes.Hybrid, label: __( 'Hybrid' ) },
	{ value: mapkit.Map.MapTypes.Standard, label: __( 'Standard' ) }
];

registerBlockType(
	'mapkitjs/map', {
		title: 'Mapkit',
		icon: {
			src: 'location-alt',
		},
		description: 'Apple Maps',
		category: 'common',
		attributes: mapAttributes,
		supports: {
			align: [ 'wide', 'full' ],
		},
		edit: props => {
			const { attributes: { showsMapTypeControl, pointLatitude, pointLongitude, pointTitle, pointSubtitle, pointGlyphText, pointColor, mapType, searchQuery }, className, setAttributes } = props;
			const redrawMap = () => {
				console.log('redraw');
				mapkit.customRedraw(pointLatitude, pointLongitude, pointTitle, pointSubtitle, pointGlyphText, pointColor);
			};
			const toggleMapTypeControl = ( value ) => {
				setAttributes( {showsMapTypeControl: !showsMapTypeControl } );
			};
			const startSearch = () => {
				let search = new mapkit.Search();
				if (searchQuery) {
					search.search(searchQuery, (error, data) => {
						if (error) {
							return;
						}
						setAttributes( { pointLatitude: data.places[0].coordinate.latitude } );
						setAttributes( { pointLongitude: data.places[0].coordinate.longitude } );
						redrawMap();
					} )
				}
			};
			return (
				<Fragment>
					<InspectorControls>
						<PanelBody title={ __( 'Map Settings' ) }>
							<ToggleControl
								label={__( 'Show Map Type Control' ) }
								help={ showsMapTypeControl ? __('Map Type Control is visible.') : __('Map Type Control is hidden.') } 
								checked={ showsMapTypeControl }
								onChange={ toggleMapTypeControl  }
							/>
							<SelectControl
								label={ __( 'Map Type' ) }
								value={ mapType }
								onChange={ (value) => { setAttributes( { mapType: value } ); redrawMap() } }
								options={ mapTypeOptions }
							/>
						</PanelBody>
						<PanelBody title={ __( 'Location Settings' ) }>
							<TextControl
								label={ __( 'Titel' ) }
								value={ pointTitle }
								onChange={ (value) => { setAttributes( { pointTitle: value } ); redrawMap() } }
							/>
							<TextControl
								label={ __( 'Subtitle' ) }
								value={ pointSubtitle }
								onChange={ (value) => { setAttributes( { pointSubtitle: value } ); redrawMap() } }
							/>
							<TextControl
								label={ __( 'Glyph Text' ) }
								value={ pointGlyphText }
								onChange={ (value) => { setAttributes( { pointGlyphText: value } ); redrawMap() } }
							/>
							<PanelColorSettings
								title={ __( 'Color Settings' ) }
								colorSettings={ [
									{
										value: pointColor,
										onChange: (value) => { setAttributes( { pointColor: value } ); redrawMap() },
										label: __( 'Glyph Color' ),
									},
								] }
							/>
							<TextControl
								label={ __( 'Search Place' ) }
								value={ searchQuery }
								onChange={ (value) => { setAttributes( { searchQuery: value } ) } }
							/>
							<Button isDefault
								onClick={ startSearch }>
								Search
							</Button>
							<TextControl
								label={ __( 'Latitude' ) }
								value={ pointLatitude }
								onChange={ (value) => { setAttributes( { pointLatitude: value } ); redrawMap() } }
							/>
							<TextControl
								label={ __( 'Longitude' ) }
								value={ pointLongitude }
								onChange={ (value) => { setAttributes( { pointLongitude: value } ); redrawMap() } }
							/>
						</PanelBody>
					</InspectorControls>
					<div 
						className={ props.className }
						id="map"
						data-shows-map-type-control={ showsMapTypeControl }
						data-map-type={ mapType }
						data-point-title={ pointTitle }
						data-point-subtitle={ pointSubtitle }
						data-point-glyph-text={ pointGlyphText }
						data-point-latitude={ pointLatitude }
						data-point-longitude={ pointLongitude }
						data-point-color={ pointColor }
					></div>
				</Fragment>
			);

		}, // end edit

		save: props => {
			const { attributes: { showsMapTypeControl, pointLatitude, pointLongitude, pointTitle, pointSubtitle, pointGlyphText, pointColor, mapType }, className, setAttributes } = props;
			return (
				<div 
					className={ props.className }
					id="map"
					data-shows-map-type-control={ showsMapTypeControl }
					data-map-type={ mapType }
					data-point-title={ pointTitle }
					data-point-subtitle={ pointSubtitle }
					data-point-glyph-text={ pointGlyphText }
					data-point-latitude={ pointLatitude }
					data-point-longitude={ pointLongitude }
					data-point-color={ pointColor }
				></div>
			);
		},
} );
