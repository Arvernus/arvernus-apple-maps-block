/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { PanelBody, TextControl } = wp.components;
const { InspectorAdvancedControls } = wp.editor;

const AdvancedBlockSidebar = ({ attributes, setAttributes }) => {
	const { pointLatitude, pointLongitude } = attributes;

	return (
		<InspectorAdvancedControls>
			<PanelBody title={__('Location Settings', 'arvernus-apple-maps-block')}>
				<TextControl
					label={__('Latitude', 'arvernus-apple-maps-block')}
					value={pointLatitude}
					onChange={value => {
						setAttributes({ pointLatitude: value });
					}}
				/>
				<TextControl
					label={__('Longitude', 'arvernus-apple-maps-block')}
					value={pointLongitude}
					onChange={value => {
						setAttributes({ pointLongitude: value });
					}}
				/>
			</PanelBody>
		</InspectorAdvancedControls>
	);
};

export default AdvancedBlockSidebar;
