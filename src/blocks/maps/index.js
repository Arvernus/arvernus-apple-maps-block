/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useRef } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { DotTip } from '@wordpress/nux';
import { Icon } from '@wordpress/components';

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
import MapSnapshot from './MapSnapchot';

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
		type: 'string',
		default: '51.5237503',
	},
	pointLongitude: {
		type: 'string',
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

		const noticeRef = useRef( null );
		const overlayRef = useRef( null );

		function toggleShakeClass() {
			noticeRef.current.classList.toggle( 'shake-top' );

			if ( noticeRef.current.classList.contains( 'shake-top' ) ) {
				window.requestAnimationFrame( () => {
					setTimeout( toggleShakeClass, 800 );
				} );
			}
		}

		useEffect( () => {
			if ( overlayRef.current ) {
				overlayRef.current.addEventListener( 'click', toggleShakeClass );
				return () => {
					overlayRef.current.removeEventListener( 'click', toggleShakeClass );
				};
			}
		} );

		return (
			<Fragment>
				<BlockSidebar attributes={ attributes } setAttributes={ setAttributes } />
				<AdvancedBlockSidebar attributes={ attributes } setAttributes={ setAttributes } />
				<CheckApi { ...props } />
				{ authenticated ? (
					<div className="wrapper">
						<div className="overlay" ref={ overlayRef }>
							<span className="notice" ref={ noticeRef }>
								<Icon icon="warning" />
								{ __( 'Preview', 'arvernus-apple-maps-block' ) }
							</span>
						</div>
						<DotTip tipId="arvernus/shows-map-type-controll">
							{ __(
								'This area is only a Preview. All the settings happen over in the Sidebar.',
								'arvernus-apple-maps-block'
							) }
						</DotTip>
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
						<MapSnapshot />
					</div>
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
