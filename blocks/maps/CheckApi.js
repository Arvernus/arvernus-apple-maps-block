class CheckApi extends wp.element.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	componentDidMount() {
		const { setAttributes } = this.props;
		fetch(`${window.location.origin}/wp-json/AppleMapKit/v1/GetJWT/`, {
			method: "GET",
			headers: {
				Accept: 'text/plain',
			},
		})
		.then(function(response) {
			if (response.status >= 200 && response.status < 400 ) {
				setAttributes( { authenticated: true } );
				return response.text();
			}
			else {
				setAttributes( { authenticated: false } );
			}
		});
	}
	render() {
		return (
			<p></p>
		);
	}
}

export default CheckApi;