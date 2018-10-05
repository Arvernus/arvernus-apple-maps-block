"use strict";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { mapkit, contains } from 'apple-mapkit-js';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { PanelBody, RangeControl } = wp.components;
const { Fragment } = wp.element;
const {
  registerBlockType,
  Editable,
  BlockControls,
  InspectorControls,
  BlockDescription,
  AlignmentToolbar,
  BlockAlignmentToolbar,
} = wp.blocks;
const {
	InnerBlocks,
} = wp.editor;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

registerBlockType(
	'mapkitjs/map', {
		title: 'Mapkit',
		icon: {
			background: '#39ab00',
		    foreground: '#fff',
			src: 'location-alt',
		},
		description: 'Slider for Clients.',
		category: 'common',
		supports: {
			align: [ 'wide', 'full' ],
		},

		edit: props => {
			return (
				<Fragment>
					<div className={ props.className } id="map">
						<h2>{ __( 'Mapkit' ) }</h2>
					</div>
				</Fragment>
			);
		}, // end edit

		save: props => {
			return (
				<div className={ props.className } id="map">
				</div>
			);
		},
} );
