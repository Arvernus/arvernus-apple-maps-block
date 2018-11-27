import Suggestions from './Suggestions'
import 'apple-mapkit-js';
import 'apple-mapkit-js/contains';

const { TextControl } = wp.components;

class Search extends wp.element.Component { 
	constructor(props) {
		super(props)
		this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSuggestionSelection = this.handleSuggestionSelection.bind(this);
		this.state = {
			query: '',
			results: []
		}
	}

  getInfo() {
    let search = new mapkit.Search();
	if (this.state.query) {
		search.search(this.state.query, (error, data) => {
			if (error) {
				return;
			}
			this.setState( {
				...this.state,
				results: data.places,
			} );
		} )
	}
  }

  handleInputChange(newValue) {
    this.setState({
      query: newValue
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
      }
    })
  }

  handleSuggestionSelection(event) {
  	const { setAttributes } = this.props;
  	const muid = event.target.dataset.muid;
  	const filteredArray = this.state.results.filter( item => muid === item.muid );
  	setAttributes( { pointLatitude: filteredArray[0].coordinate.latitude } );
    setAttributes( { pointLongitude: filteredArray[0].coordinate.longitude } );
  	this.setState( {
  		query: '',
  		results: []
  	} )
  }

  render() {
    return (
      <form>
        <TextControl
        	label="Search"
        	placeholder="Search for..."
        	value={ this.state.query }
        	onChange={ newValue => { this.handleInputChange(newValue) } }
        />
        <Suggestions results={ this.state.results } callback={ this.handleSuggestionSelection } />
      </form>
    )
  }
}

export default Search;
