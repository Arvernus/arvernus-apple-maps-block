/**
 * External dependencies
 */
import { AppleMaps, Annotation, ImageAnnotation } from 'react-apple-mapkitjs';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment, createRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

class AppleMap extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			token: null,
		};
	}
	componentDidMount() {
		apiFetch( { path: '/AppleMapKit/v1/GetJWT/' } ).then( ( jwtToken ) => {
			this.setState( { token: jwtToken } );
		} );
	}
	render() {
		const {
			mapType,
			showsMapTypeControl,
			showsZoomControl,
			pointLatitude,
			pointLongitude,
			pointTitle,
			pointSubtitle,
			pointGlyphText,
			pointColor,
		} = this.props;
		const { token } = this.state;
		return (
			<AppleMaps
				token={ token }
				longitude={ pointLongitude }
				latitude={ pointLatitude }
				zoomLevel={ 6 }
				height="500px"
				width="100%"
			>
				<Annotation
					longitude={ pointLongitude }
					latitude={ pointLatitude }
					color={ pointColor }
					title={ pointTitle }
					subtitle={ pointSubtitle }
					selected={ true }
					glyphText={ pointGlyphText }
				/>
			</AppleMaps>
		);
	}
}

export default AppleMap;
