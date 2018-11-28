class CheckApi extends wp.element.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	componentDidMount() {
		const { setAttributes } = this.props;
		wp.apiFetch( { path: '/AppleMapKit/v1/GetJWT/' } )
			.then( response => {
				setAttributes( { authenticated: true } );
				return response;
			});
	}
	render() {
		return (
			<p></p>
		);
	}
}

export default CheckApi;