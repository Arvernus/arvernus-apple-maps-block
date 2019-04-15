/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import AppleMap from './AppleMap';
import CheckApi from './CheckApi';
import ToggleSidebarButton from './ToggleSidebarButton';
import AdvancedBlockSidebar from './AdvancedBlockSidebar';
import BlockSidebar from './BlockSidebar';

import './style.scss';
import './editor.scss';

const mapAttributes = {
	mapType: {
		type: 'string',
		default: window.mapkit.Map.MapTypes.Standard,
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
	},
};

registerBlockType( 'mapkitjs/map', {
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
	edit: ( props ) => {
		const {
			attributes,
			attributes: {
				authenticated,
				showsMapTypeControl,
				pointLatitude,
				pointLongitude,
				pointTitle,
				pointSubtitle,
				pointGlyphText,
				pointColor,
				mapType,
			},
			className,
			setAttributes,
		} = props;

		return (
			<Fragment>
				<BlockSidebar attributes={ attributes } setAttributes={ setAttributes } />
				<AdvancedBlockSidebar attributes={ attributes } setAttributes={ setAttributes } />
				<CheckApi { ...props } />
				{ authenticated ? (
					<AppleMap
						{ ...props }
						className={ className }
						showsMapTypeControl={ showsMapTypeControl }
						mapType={ mapType }
						pointTitle={ pointTitle }
						pointSubtitle={ pointSubtitle }
						pointGlyphText={ pointGlyphText }
						pointLatitude={ pointLatitude }
						pointLongitude={ pointLongitude }
						pointColor={ pointColor }
					/>
				) : (
					<p>
						{ __( 'Please enter an API key in the block settings', 'arvernus-apple-maps-block' ) + ' ' }
						<ToggleSidebarButton />
					</p>
				) }
			</Fragment>
		);
	}, // end edit

	save: ( props ) => {
		const {
			attributes: {
				showsMapTypeControl,
				pointLatitude,
				pointLongitude,
				pointTitle,
				pointSubtitle,
				pointGlyphText,
				pointColor,
				mapType,
			},
			className,
		} = props;
		return (
			<AppleMap
				className={ className }
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
