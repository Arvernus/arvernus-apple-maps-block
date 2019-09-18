/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import {
	title,
	attributes,
	description,
	category,
	icon,
	supports,
} from './block.json';
import edit from './edit';
import save from './save';

registerBlockType( 'mapkitjs/map', {
	title,
	icon,
	description,
	category,
	attributes,
	supports,
	edit,
	save,
} );
