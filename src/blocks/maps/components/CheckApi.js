/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { useEffect } from '@wordpress/element';

const CheckApi = ( props ) => {
	const { setAttributes } = props;

	useEffect( () => {
		apiFetch( { path: '/AppleMapKit/v1/GetJWT/' } ).then( () => {
			setAttributes( { authenticated: true } );
		} ).catch();
	}, [ props ] );

	return null;
};

export default CheckApi;
