import "apple-mapkit-js";
import "apple-mapkit-js/contains";

const { __, sprintf } = wp.i18n;
const { Fragment } = wp.components;

class AppleMap extends wp.element.Component {
  constructor(props) {
    super(props);
    this.mapDomNode = React.createRef();
    this.state = {
      appleMap: {},
      markerCoordinate: {},
      markerAnnotation: {}
    };
  }
  componentDidMount() {
    mapkit.init({
      authorizationCallback: function(done) {
        wp.apiFetch({ path: "/AppleMapKit/v1/GetJWT/" }).then(jwtToken => {
          done(jwtToken);
        });
      }
    });

    const markerCoordinate = new mapkit.Coordinate(
      Number.parseFloat(this.props.pointLatitude),
      Number.parseFloat(this.props.pointLongitude)
    );

    const markerAnnotation = new mapkit.MarkerAnnotation(markerCoordinate);
    markerAnnotation.color = this.props.pointColor;
    markerAnnotation.title = this.props.pointTitle;
    markerAnnotation.subtitle = this.props.pointSubtitle;
    markerAnnotation.selected = "true";
    markerAnnotation.glyphText = this.props.pointGlyphText;
    const appleMap = new mapkit.Map(this.mapDomNode.current);
    appleMap.mapType = this.props.mapType;
    appleMap.showsMapTypeControl = this.props.showsMapTypeControl;
    appleMap.showsCompass = mapkit.FeatureVisibility.Adaptive;
    appleMap.showsZoomControl = this.props.showsZoomControl;
    appleMap.showItems([markerAnnotation], {
      animate: true,
      padding: new mapkit.Padding(800, 200, 800, 200)
    });
    this.setState({
      appleMap: appleMap,
      markerAnnotation: markerAnnotation,
      markerCoordinate: markerCoordinate
    });
  }
  componentDidUpdate() {
    const newLocation = new mapkit.Coordinate(
      Number.parseFloat(this.props.pointLatitude),
      Number.parseFloat(this.props.pointLongitude)
    );

    let markerCoordinate = this.state.markerCoordinate;

    if (
      !(
        markerCoordinate.latitude === newLocation.latitude &&
        markerCoordinate.longitude === newLocation.longitude
      )
    ) {
      markerCoordinate = newLocation;
    }

    const markerAnnotation = this.state.markerAnnotation;
    markerAnnotation.coordinate = markerCoordinate;
    markerAnnotation.color = this.props.pointColor;
    markerAnnotation.title = this.props.pointTitle;
    markerAnnotation.subtitle = this.props.pointSubtitle;
    markerAnnotation.selected = "true";
    markerAnnotation.glyphText = this.props.pointGlyphText;

    const appleMap = this.state.appleMap;
    appleMap.mapType = this.props.mapType;
    appleMap.showsMapTypeControl = this.props.showsMapTypeControl;
    appleMap.showsCompass = mapkit.FeatureVisibility.Adaptive;
    appleMap.showsZoomControl = this.props.showsZoomControl;
    appleMap.showItems([markerAnnotation], {
      animate: true,
      padding: new mapkit.Padding(800, 200, 800, 200)
    });
  }
  render() {
    return (
      <div
        ref={this.mapDomNode}
        className={this.props.className}
        id="map"
        data-shows-map-type-control={this.props.showsMapTypeControl}
        data-shows-compass={this.props.showsCompass}
        data-shows-zoom-controll={this.props.showsZoomControl}
        data-map-type={this.props.mapType}
        data-point-title={this.props.pointTitle}
        data-point-subtitle={this.props.pointSubtitle}
        data-point-glyph-text={this.props.pointGlyphText}
        data-point-latitude={this.props.pointLatitude}
        data-point-longitude={this.props.pointLongitude}
        data-point-color={this.props.pointColor}
      />
    );
  }
}

export default AppleMap;
