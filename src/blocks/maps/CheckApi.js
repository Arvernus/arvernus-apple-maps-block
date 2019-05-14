/**
 * WordPress dependencies
 */
const apiFetch = wp.apiFetch;
const { Component } = wp.element;

class CheckApi extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		const { setAttributes } = this.props;
		apiFetch({ path: '/AppleMapKit/v1/GetJWT/' })
			.then(response => {
				setAttributes({ authenticated: true });
				return response;
			})
			.catch(() => {});
	}
	componentDidUpdate() {
		const { setAttributes } = this.props;
		apiFetch({ path: '/AppleMapKit/v1/GetJWT/' })
			.then(response => {
				setAttributes({ authenticated: true });
				return response;
			})
			.catch(() => {});
	}
	render() {
		return null;
	}
}

export default CheckApi;
