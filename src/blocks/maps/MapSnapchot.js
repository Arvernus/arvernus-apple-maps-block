/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
const { sign } = require( 'jwa' )( 'ES256' );

const MapSnapshot = () => {
	const [ teamId, setTeamId ] = useState( null );
	const [ keyId, setKeyId ] = useState( null );
	const [ privateKey, setPrivateKey ] = useState( null );

	function signSignature( params ) {
		const snapshotPath = `/api/v1/snapshot?${ params }`;
		const completePath = `${ snapshotPath }&teamId=${ teamId }&keyId=${ keyId }`;
		const signature = sign( completePath, privateKey );
		// In this example, the jwa module returns the signature as a Base64 URL-encoded string.

		// Append the signature to the end of the request URL, and return.
		return `${ completePath }&signature=${ signature }`;
	}

	useEffect( () => {
		( async () => {
			const fetchedTeamId = await apiFetch( {
				path: '/AppleMapKit/v1/team_id/get/',
			} );
			setTeamId( fetchedTeamId );
			const fetchedKeyId = await apiFetch( {
				path: '/AppleMapKit/v1/key_id/get/',
			} );
			setKeyId( fetchedKeyId );
			const fetchedPrivateKey = await apiFetch( {
				path: '/AppleMapKit/v1/private_key/get/',
			} );
			setPrivateKey( fetchedPrivateKey );
		} )();
	}, [] );

	return (
		keyId &&
		teamId &&
		privateKey && (
			<img src={ `https://snapshot.apple-mapkit.com${ signSignature( 'center=apple+park' ) }` } alt="" />
		)
	);
};

export default MapSnapshot;
