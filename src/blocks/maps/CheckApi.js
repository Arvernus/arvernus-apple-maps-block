/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

class CheckApi extends Component {
	constructor( props ) {
		super( props );
		this.state = {};
	}
	componentDidMount() {
		const { setAttributes } = this.props;
		apiFetch( { path: '/AppleMapKit/v1/GetJWT/' } )
			.then( ( response ) => {
				setAttributes( { authenticated: true } );
				return response;
			} )
			.catch( ( error ) => {
				console.log( error );
			} );
	}
	componentDidUpdate() {
		const {
			attributes: { authenticated },
			setAttributes,
		} = this.props;
		apiFetch( { path: '/AppleMapKit/v1/GetJWT/' } )
			.then( ( response ) => {
				setAttributes( { authenticated: true } );
				return response;
			} )
			.catch( ( error ) => {
				console.log( error );
			} );
	}
	render() {
		return null;
	}
}

export default CheckApi;
