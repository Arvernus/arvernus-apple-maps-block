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
    wp.apiFetch({
      path: "/AppleMaps/v1/private_key",
      data: {
        body: 'Hallo',
      },
      method: 'POST',
    }).then(response => {
      console.log(response);
    }).catch(error => { console.log(error) })
  }
  render() {
    return null;
  }
}

export default CheckApi;
