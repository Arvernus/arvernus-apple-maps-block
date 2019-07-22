/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
import { dispatch } from '@wordpress/data';
const { sign } = require( 'jwa' )( 'ES256' );

const MapSnapshot = ( props ) => {
	const [ teamId, setTeamId ] = useState( null );
	const [ keyId, setKeyId ] = useState( null );
	const [ privateKey, setPrivateKey ] = useState( null );

	const { mapType, pointLatitude, pointLongitude } = props;

	function signSignature( params ) {
		if ( privateKey && keyId && teamId ) {
			const url = `https://snapshot.apple-mapkit.com/v1/snapshot?${ params }&teamId=${ teamId }&keyId=${ keyId }`;
			const signature = sign( url, privateKey );
			const signedUrl = `${ url }&signature=${ signature }`;
			// In this example, the jwa module returns the signature as a Base64 URL-encoded string.
			// Append the signature to the end of the request URL, and return.
			return `${ signedUrl }`;
		}
	}

	const imageUrl = signSignature(
		`center=${ pointLatitude },${ pointLongitude }&size=640x420&scale=2&type=${ mapType }&lang=de-DE&spn=0.001737252781879306,0.002682209014892578`
	);

	useEffect( () => {
		const teamIdFetch = apiFetch( {
			path: '/AppleMapKit/v1/team_id/get/',
		} );
		const keyIdFetch = apiFetch( {
			path: '/AppleMapKit/v1/key_id/get/',
		} );
		const privateKeyFetch = apiFetch( {
			path: '/AppleMapKit/v1/private_key/get/',
		} );
		Promise.all( [ teamIdFetch, keyIdFetch, privateKeyFetch ] )
			.then( ( [ fetchedTeamId, fetchedKeyId, fetchedPrivateKey ] ) => {
				setTeamId( JSON.parse( fetchedTeamId ) );
				setKeyId( JSON.parse( fetchedKeyId ) );
				setPrivateKey( JSON.parse( fetchedPrivateKey ) );
			} )
			.catch( async ( error ) => {
				dispatch( 'core/notices' ).createErrorNotice(
					`There has been an error in the Apple Maps Plugin: ${ error.message }`
				);
			} );
	}, [] );

	return keyId && teamId && privateKey && <img src={ imageUrl } alt="" />;
};

export default MapSnapshot;
