const Map = ( props ) => {
	const { showsMapTypeControl,
		showsCompass,
		pointLatitude,
		pointLongitude,
		pointTitle,
		pointSubtitle,
		pointGlyphText,
		showsZoomControl,
		pointColor,
		mapType,
		className,
		ref,
	} = props;

	return (
		<div
			ref={ ref }
			className={ className }
			id="map"
			data-shows-map-type-control={ showsMapTypeControl }
			data-shows-compass={ showsCompass }
			data-shows-zoom-controll={ showsZoomControl }
			data-map-type={ mapType }
			data-point-title={ pointTitle }
			data-point-subtitle={ pointSubtitle }
			data-point-glyph-text={ pointGlyphText }
			data-point-latitude={ pointLatitude }
			data-point-longitude={ pointLongitude }
			data-point-color={ pointColor }
		/>
	);
};

export default Map;
