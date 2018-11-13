class AppleMap extends wp.element.Component {
	componentDidMount() {
		mapkit.init({
			authorizationCallback: function(done) {
				fetch("https://arvernus.info/wp-json/AppleMapKit/v1/GetJWT/", {
					method: "GET",
					headers: {
						Accept: 'text/plain',
					},
				},)
				.then(function(response) {
					if (response.status >= 200 && response.status < 400 ) {
						return response.text();
					}
					else {
						throw `Response resulted in error ${response.status}`;
					}
				})
				.then(function(result) {
					done(result)
				});
			}
		});

		const map = new mapkit.Map('map');
		map.mapType = this.props.mapType;
		map.showsMapTypeControl = this.props.showsMapTypeControl;
		// map.showsCompass = 'hidden';
		// map.showsZoomControl = false;

		if ( this.props.pointLongitude && this.props.pointLatitude ) {
			const customLocation = new mapkit.Coordinate( Number.parseFloat( this.props.pointLatitude ), Number.parseFloat( this.props.pointLongitude ) );
			const customAnnotation = new mapkit.MarkerAnnotation( customLocation );

			customAnnotation.color = this.props.pointColor; 
			customAnnotation.title = this.props.pointTitle;
			customAnnotation.subtitle = this.props.pointSubtitle;
			customAnnotation.selected = "true";
			customAnnotation.glyphText = this.props.pointGlyphText;    
			map.showItems(
				[customAnnotation],
				{ 
					animate: true,
					padding: new mapkit.Padding(800, 200, 800, 200)
				}
			);
		}
	}
	componentDidUpdate() {
		document.getElementById('map').innerHTML = "";
		const map = new mapkit.Map('map');
		map.mapType = this.props.mapType;
		map.showsMapTypeControl = this.props.showsMapTypeControl;
		// map.showsCompass = 'hidden';
		// map.showsZoomControl = false;

		if ( this.props.pointLongitude && this.props.pointLatitude ) {
			const customLocation = new mapkit.Coordinate( Number.parseFloat( this.props.pointLatitude ), Number.parseFloat( this.props.pointLongitude ) );
			const customAnnotation = new mapkit.MarkerAnnotation( customLocation );

			customAnnotation.color = this.props.pointColor; 
			customAnnotation.title = this.props.pointTitle;
			customAnnotation.subtitle = this.props.pointSubtitle;
			customAnnotation.selected = "true";
			customAnnotation.glyphText = this.props.pointGlyphText;    
			map.showItems(
				[customAnnotation],
				{ 
					animate: true,
					padding: new mapkit.Padding(800, 200, 800, 200)
				}
			);
		}
	}
	render() {
		return (
			<div 
				className={ this.props.className }
				id="map"
				data-shows-map-type-control={ this.props.showsMapTypeControl }
				data-map-type={ this.props.mapType }
				data-point-title={ this.props.pointTitle }
				data-point-subtitle={ this.props.pointSubtitle }
				data-point-glyph-text={ this.props.pointGlyphText }
				data-point-latitude={ this.props.pointLatitude }
				data-point-longitude={ this.props.pointLongitude }
				data-point-color={ this.props.pointColor }
			></div>
		);
	};
};

export default AppleMap;