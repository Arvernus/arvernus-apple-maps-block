/**
 * Internal dependencies
 */
import Suggestions from './Suggestions';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { TextControl, Popover } from '@wordpress/components';

const Search = ( props ) => {
	const { setAttributes } = props;

	const [ query, setQuery ] = useState( '' );
	const [ places, setPlaces ] = useState( [] );

	useEffect( () => {
		const search = new window.mapkit.Search();
		if ( query ) {
			search.search( query, ( error, data ) => {
				if ( error ) {
					return;
				}
				console.info( data );
				setPlaces( data.places );
			} );
		}
	}, [ query ] );

	const handleInputChange = ( newValue ) => {
		setQuery( newValue );
	};

	const handleSuggestionSelection = ( muid ) => {
		const filteredArray = places.filter( ( place ) => muid === place.muid );
		setAttributes( { pointLatitude: filteredArray[ 0 ].coordinate.latitude } );
		setAttributes( { pointLongitude: filteredArray[ 0 ].coordinate.longitude } );
		setQuery( '' );
		setPlaces( [] );
	};

	return (
		<form
			onSubmit={ ( event ) => {
				event.preventDefault();
			} }
		>
			<TextControl
				label={ __( 'Search', 'arvernus-apple-maps-block' ) }
				placeholder={ __( 'Name or Adress of a Place...', 'arvernus-apple-maps-block' ) }
				value={ query }
				onChange={ ( newValue ) => {
					handleInputChange( newValue );
				} }
				autoComplete="off"
			/>
			{ places.length > 0 && (
				<Popover position="bottom" className="popover-suggestion-list" focusOnMount="false">
					<Suggestions results={ places } handleSelection={ handleSuggestionSelection } />
				</Popover>
			) }
		</form>
	);
};

export default Search;
