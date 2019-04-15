/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControl, TextareaControl, Button, Notice } from '@wordpress/components';
import { Fragment, useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const Authenticate = () => {
	const [ privateKey, setPrivateKey ] = useState( null );
	const [ keyId, setKeyId ] = useState( null );
	const [ teamId, setTeamId ] = useState( null );
	const [ isEditing, setIsEditing ] = useState( false );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ isSavingPrivateKey, setIsSavingPrivateKey ] = useState( false );
	const [ isSavingTeamId, setIsSavingTeamId ] = useState( false );
	const [ isSavingKeyId, setIsSavingKeyId ] = useState( false );
	const [ savingHasFailed, setSavingHasFailed ] = useState( false );

	useEffect( () => {
		apiFetch( {
			path: '/AppleMapKit/v1/private_key/get/',
		} )
			.then( ( response ) => {
				setPrivateKey( JSON.parse( response ) );
			} )
			.catch( () => {} );

		apiFetch( {
			path: '/AppleMapKit/v1/team_id/get/',
		} )
			.then( ( response ) => {
				setTeamId( JSON.parse( response ) );
			} )
			.catch( () => {} );

		apiFetch( {
			path: '/AppleMapKit/v1/key_id/get/',
		} )
			.then( ( response ) => {
				setKeyId( JSON.parse( response ) );
			} )
			.catch( () => {} );
	}, [] );

	const toggleIsEditing = () => {
		setIsEditing( ! isEditing );
	};

	const onSave = () => {
		setIsSaving( true );
		setIsSavingPrivateKey( true );
		setIsSavingTeamId( true );
		setIsSavingKeyId( true );

		apiFetch( {
			path: '/AppleMapKit/v1/private_key/',
			method: 'POST',
			data: privateKey,
		} )
			.then( () => {
				setIsSavingPrivateKey( false );
			} )
			.catch( () => {
				setSavingHasFailed( true );
			} );

		apiFetch( {
			path: '/AppleMapKit/v1/team_id/',
			method: 'POST',
			data: teamId,
		} )
			.then( () => {
				setIsSavingTeamId( false );
			} )
			.catch( () => {
				setSavingHasFailed( true );
			} );

		apiFetch( {
			path: '/AppleMapKit/v1/key_id/',
			method: 'POST',
			data: keyId,
		} )
			.then( () => {
				setIsSavingKeyId( false );
			} )
			.catch( () => {
				setSavingHasFailed( true );
			} );
	};

	useEffect( () => {
		if ( ! isSavingKeyId && ! isSavingPrivateKey && ! isSavingTeamId && isSaving ) {
			setIsSaving( false );
			setSavingHasFailed( false );
		}
	}, [ isSavingKeyId, isSavingPrivateKey, isSavingTeamId, isSaving, savingHasFailed ] );

	return (
		<Fragment>
			{ isEditing ? (
				<form>
					<TextareaControl
						label={ __( 'Please enter your private Key', 'arvernus-apple-maps-block' ) }
						readonly={ isSaving }
						name="private_key"
						value={ privateKey }
						onChange={ ( newPrivateKey ) => setPrivateKey( newPrivateKey ) }
					/>
					<TextControl
						label={ __( 'Please enter your Key ID', 'arvernus-apple-maps-block' ) }
						readonly={ isSaving }
						name="key_id"
						value={ keyId }
						onChange={ ( newKeyId ) => setKeyId( newKeyId ) }
					/>
					<TextControl
						label={ __( 'Please enter your Team ID', 'arvernus-apple-maps-block' ) }
						readonly={ isSaving }
						name="team_id"
						value={ teamId }
						onChange={ ( newTeamId ) => setTeamId( newTeamId ) }
					/>
					<p>
						<Button isButton isPrimary disabled={ isSaving } isBusy={ isSaving } onClick={ onSave }>
							Save API Key
						</Button>{ ' ' }
						<Button isButton disabled={ isSaving } onClick={ toggleIsEditing }>
							Cancel
						</Button>
					</p>
					<p>
						<a
							href="https://developer.apple.com/documentation/mapkitjs/setting_up_mapkit_js"
							target="_blank"
							rel="noopener noreferrer"
						>
							{ __(
								'Instructions for getting a your Apple Maps Credentials.',
								'arvernus-apple-maps-block'
							) }
						</a>
					</p>
				</form>
			) : (
				<Fragment>
					<p>{ __( 'API Key Saved', 'arvernus-apple-maps-block' ) }</p>
					<p>
						<Button className="is-button" onClick={ toggleIsEditing }>
							{ __( 'Edit API Key', 'arvernus-apple-maps-block' ) }
						</Button>
					</p>
				</Fragment>
			) }
			{ savingHasFailed && (
				<Notice status="error">
					<p>{ __( 'Something has gone wrong. Please try Again', 'arvernus-apple-maps-block' ) }</p>
				</Notice>
			) }
		</Fragment>
	);
};
export default Authenticate;
