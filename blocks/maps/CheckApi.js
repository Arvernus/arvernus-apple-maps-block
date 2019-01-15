class CheckApi extends wp.element.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { setAttributes } = this.props;
    wp.apiFetch({ path: "/AppleMapKit/v1/GetJWT/" }).then(response => {
      setAttributes({ authenticated: true });
      return response;
    }).catch(error => {
      console.log(error)
    });
  }
  componentDidUpdate() {
    const { attributes: { authenticated }, setAttributes } = this.props;
    wp.apiFetch({ path: "/AppleMapKit/v1/GetJWT/" }).then(response => {
      setAttributes({ authenticated: true });
      return response;
    }).catch(error => {
      console.log(error)
    });
  }
  render() {
    return null;
  }
}

export default CheckApi;
