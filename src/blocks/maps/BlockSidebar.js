/**
 * Internal dependencies
 */
import Search from './Search';
import Authenticate from './Authenticate';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { PanelBody, TextControl, ToggleControl, SelectControl } = wp.components;
const { InspectorControls, PanelColorSettings } = wp.editor;
const { DotTip } = wp.nux;
const { select, dispatch } = wp.data;

const mapTypeOptions = Object.keys(window.mapkit.Map.MapTypes).map(key => {
	return {
		label: key,
		value: window.mapkit.Map.MapTypes[key],
	};
});

const BlockSidebar = ({ attributes, setAttributes }) => {
	const {
		showsMapTypeControl,
		pointTitle,
		pointSubtitle,
		pointGlyphText,
		pointColor,
		mapType,
		showsZoomControl,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={__('Authentication')}>
				<Authenticate />
			</PanelBody>
			<PanelBody title={__('Map Settings')}>
				<ToggleControl
					label={__('Show Map Type Control')}
					help={
						showsMapTypeControl
							? __('Map Type Control is visible.')
							: __('Map Type Control is hidden.')
					}
					checked={showsMapTypeControl}
					onChange={() => {
						setAttributes({ showsMapTypeControl: !showsMapTypeControl });
					}}
				/>
				<ToggleControl
					label={__('Show Zoom Control')}
					help={showsZoomControl ? __('Zoom Control is visible.') : __('Zoom Control is hidden.')}
					checked={showsZoomControl}
					onChange={() => {
						setAttributes({ showsZoomControl: !showsZoomControl });
					}}
				/>
				<SelectControl
					label={__('Map Type')}
					value={mapType}
					onChange={value => {
						setAttributes({ mapType: value });
					}}
					options={mapTypeOptions}
				/>
			</PanelBody>
			<PanelBody title={__('Location Settings')}>
				<Search setAttributes={setAttributes} />
				<TextControl
					label={__('Titel')}
					value={pointTitle}
					onChange={value => {
						setAttributes({ pointTitle: value });
					}}
				/>
				<TextControl
					label={__('Subtitle')}
					value={pointSubtitle}
					onChange={value => {
						setAttributes({ pointSubtitle: value });
					}}
				/>
				<TextControl
					label={__('Glyph Text')}
					value={pointGlyphText}
					onChange={value => {
						setAttributes({ pointGlyphText: value });
					}}
				/>
				<PanelColorSettings
					title={__('Color Settings')}
					colorSettings={[
						{
							value: pointColor,
							onChange: value => {
								setAttributes({ pointColor: value });
							},
							label: __('Glyph Color'),
						},
					]}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default BlockSidebar;
