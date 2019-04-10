const Suggestions = ( props ) => {
	let options = props.results.map( ( element ) => (
		<li
			key={ element.muid }
			onClick={ ( event ) => {
				props.callback( event );
			} }
			data-muid={ element.muid }
		>
			{ element.name }
		</li>
	) );
	if ( ! options ) {
		options = <li>Nothing Found</li>;
	}
	return <ul>{ options }</ul>;
};

export default Suggestions;
