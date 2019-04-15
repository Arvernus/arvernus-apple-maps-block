/**
 * Internal dependencies
 */
import Suggestions from './Suggestions';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControl, Popover } from '@wordpress/components';
import { Component } from '@wordpress/element';

class Search extends Component {
	constructor( props ) {
		super( props );
		this.handleInputChange = this.handleInputChange.bind( this );
		this.handleSuggestionSelection = this.handleSuggestionSelection.bind( this );
		this.state = {
			query: '',
			results: [],
		};
	}

	getInfo() {
		const search = new window.mapkit.Search();
		if ( this.state.query ) {
			search.search( this.state.query, ( error, data ) => {
				if ( error ) {
					return;
				}
				this.setState( {
					...this.state,
					results: data.places,
				} );
			} );
		}
	}

	handleInputChange( newValue ) {
		this.setState(
			{
				query: newValue,
			},
			() => {
				if ( this.state.query && this.state.query.length > 1 ) {
					if ( this.state.query.length % 2 === 0 ) {
						this.getInfo();
					}
				} else if ( ! this.state.query ) {
				}
			}
		);
	}

	handleSuggestionSelection( event ) {
		const { setAttributes } = this.props;
		const muid = event.target.dataset.muid;
		const filteredArray = this.state.results.filter( ( item ) => muid === item.muid );
		setAttributes( { pointLatitude: filteredArray[ 0 ].coordinate.latitude } );
		setAttributes( { pointLongitude: filteredArray[ 0 ].coordinate.longitude } );
		this.setState( {
			query: '',
			results: [],
		} );
	}

	render() {
		return (
			<form
				onSubmit={ ( event ) => {
					event.preventDefault();
				} }
			>
				<TextControl
					label={ __( 'Search', 'arvernus-apple-maps-block' ) }
					placeholder={ __( 'Name or Adress of a Place...', 'arvernus-apple-maps-block' ) }
					value={ this.state.query }
					onChange={ ( newValue ) => {
						this.handleInputChange( newValue );
					} }
					autocomplete="off"
				/>
				{ this.state.results.length > 0 && (
					<Popover position="bottom" className="popover-suggestion-list" focusOnMount="false">
						<Suggestions results={ this.state.results } callback={ this.handleSuggestionSelection } />
					</Popover>
				) }
			</form>
		);
	}
}

export default Search;
