"use strict";

/**
 * External dependencies
 */
import classnames from 'classnames';
import AppleMap from './AppleMap';
import CheckApi from './CheckApi';
import Search from './Search';

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
	InspectorAdvancedControls,
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
	showsZoomControl: {
		type: 'Boolean',
		default: true,
	},
	pointLatitude: {
		type: 'number',
		default: '51.5237503',
	},
	pointLongitude: {
		type: 'number',
		default: '-0.158555',
	},
	pointTitle: {
		type: 'string',
		default: '221B Baker Street',
	},
	pointSubtitle: {
		type: 'string',
		default: 'London',
	},
	pointGlyphText: {
		type: 'string',
		default: '',
	},
	pointColor: {
		type: 'string',
		default: '#000000',
	},
	authenticated: {
		type: 'boolean',
		default: false,
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
			const { attributes: { authenticated, showsMapTypeControl, showsZoomControl, pointLatitude, pointLongitude, pointLocationName, pointTitle, pointSubtitle, pointGlyphText, pointColor, mapType, searchQuery }, className, setAttributes } = props;
			const toggleMapTypeControl = ( value ) => {
				setAttributes( {showsMapTypeControl: !showsMapTypeControl } );
			};
			return (
				<Fragment>
					<InspectorControls>
						<PanelBody title={ __( 'Map Settings' ) }>
							<ToggleControl
								label={__( 'Show Map Type Control' ) }
								help={ showsMapTypeControl ? __('Map Type Control is visible.') : __('Map Type Control is hidden.') } 
								checked={ showsMapTypeControl }
								onChange={ value => { setAttributes( {showsMapTypeControl: !showsMapTypeControl } ) }  }
							/>
							<ToggleControl
								label={__( 'Show Zoom Control' ) }
								help={ showsZoomControl ? __('Zoom Control is visible.') : __('Zoom Control is hidden.') } 
								checked={ showsZoomControl }
								onChange={ value => { setAttributes( {showsZoomControl: !showsZoomControl } ) }  }
							/>
							<SelectControl
								label={ __( 'Map Type' ) }
								value={ mapType }
								onChange={ value => { setAttributes( { mapType: value } ) } }
								options={ mapTypeOptions }
							/>
						</PanelBody>
						<PanelBody title={ __( 'Location Settings' ) }>
							<Search {...props} />
							<TextControl
								label={ __( 'Titel' ) }
								value={ pointTitle }
								onChange={ value => { setAttributes( { pointTitle: value } ) } }
							/>
							<TextControl
								label={ __( 'Subtitle' ) }
								value={ pointSubtitle }
								onChange={ value => { setAttributes( { pointSubtitle: value } ) } }
							/>
							<TextControl
								label={ __( 'Glyph Text' ) }
								value={ pointGlyphText }
								onChange={ value => { setAttributes( { pointGlyphText: value } ) } }
							/>
							<PanelColorSettings
								title={ __( 'Color Settings' ) }
								colorSettings={ [
									{
										value: pointColor,
										onChange: value => { setAttributes( { pointColor: value } ) },
										label: __( 'Glyph Color' ),
									},
								] }
							/>
						</PanelBody>
					</InspectorControls>
					<InspectorAdvancedControls>
						<PanelBody title={ __( 'Location Settings' ) }>
							<TextControl
								label={ __( 'Latitude' ) }
								value={ pointLatitude }
								onChange={ value => { setAttributes( { pointLatitude: value } ) } }
							/>
							<TextControl
								label={ __( 'Longitude' ) }
								value={ pointLongitude }
								onChange={ value => { setAttributes( { pointLongitude: value } ) } }
							/>
						</PanelBody>
					</InspectorAdvancedControls>
					<CheckApi {...props} />
					{ authenticated 
						? <AppleMap {...props}
							className={ props.className }
							showsMapTypeControl={ showsMapTypeControl }
							mapType={ mapType }
							pointTitle={ pointTitle }
							pointSubtitle={ pointSubtitle }
							pointGlyphText={ pointGlyphText }
							pointLatitude={ pointLatitude }
							pointLongitude={ pointLongitude }
							pointColor={ pointColor }
						/>
						: <p>__( 'The Map is not Authenticated. Please visit the Apple Map Settings in your Customizer and enter your Credentials.' )</p>
					}
				</Fragment>
			);

		}, // end edit

		save: props => {
			const { attributes: { showsMapTypeControl, showsCompass, showsZoomControl, pointLatitude, pointLongitude, pointTitle, pointSubtitle, pointGlyphText, pointColor, mapType, searchQuery }, className } = props;
			return (
				<AppleMap 
					className={ props.className }
					showsMapTypeControl={ showsMapTypeControl }
					mapType={ mapType }
					pointTitle={ pointTitle }
					pointSubtitle={ pointSubtitle }
					pointGlyphText={ pointGlyphText }
					pointLatitude={ pointLatitude }
					pointLongitude={ pointLongitude }
					pointColor={ pointColor }
				/>
			);
		},
} );
