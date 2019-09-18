/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';
import { DotTip } from '@wordpress/nux';
import { Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import AppleMap from './AppleMap';

export default ( props ) => {
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

	const noticeRef = useRef( null );
	const overlayRef = useRef( null );

	function toggleShakeClass() {
		if ( noticeRef.current ) {
			noticeRef.current.classList.toggle( 'shake-top' );

			if ( noticeRef.current.classList.contains( 'shake-top' ) ) {
				window.requestAnimationFrame( () => {
					setTimeout( toggleShakeClass, 800 );
				} );
			}
		}
	}

	useEffect( () => {
		if ( overlayRef.current ) {
			overlayRef.current.addEventListener( 'click', toggleShakeClass );
			return () => {
				overlayRef.current.removeEventListener( 'click', toggleShakeClass );
			};
		}
	}, [ overlayRef ] );

	return (
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
		</div>
	);
};
