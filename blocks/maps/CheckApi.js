class CheckApi extends wp.element.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.checkApi = this.checkApi.bind(this);
	}

	checkApi() {
		const { setAttributes } = this.props;
		wp.apiFetch({ path: "/AppleMapKit/v1/GetJWT/" })
			.then(response => {
				setAttributes({ authenticated: true });
				return response;
			})
			.catch(error => {
				console.warn(error);
			});
	}

	componentDidMount() {
		this.checkApi();
	}
	componentDidUpdate() {
		this.checkApi();
	}
	render() {
		return null;
	}
}

export default CheckApi;
