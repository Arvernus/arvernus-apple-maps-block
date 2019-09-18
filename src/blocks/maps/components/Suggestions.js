const Suggestions = ( props ) => {
	const { results, handleSelection } = props;
	let options = results.map( ( element ) => (
		<li
			key={ element.muid }
			data-muid={ element.muid }
			onClick={ () => {
				handleSelection( element.muid );
			} }
		>
			{ element.name }
		</li>
	) );
	if ( ! options ) {
		options = <li>Nothing Found</li>;
	}
	return (
		<ul>{ options }</ul>
	);
};

export default Suggestions;
