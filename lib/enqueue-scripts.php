<?php

namespace Arvernus\Apple_Maps_Block;

add_action('init', __NAMESPACE__.'\register_block_assets');

function register_block_assets() {

	$block_path = '/build/index.js';
	wp_register_script(
		'arvernus-apple-maps-block',
		_get_plugin_url() . $block_path,
		[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor', 'wp-api-fetch' ],
		APPLE_MAPS_BLOCK_CURRENT_VERSION
	);

	$style_path = '/build/style.css';
	wp_register_style(
		'arvernus-apple-maps-block-styles',
		_get_plugin_url() . $style_path,
		[],
		APPLE_MAPS_BLOCK_CURRENT_VERSION
	);
	
	$editor_style_path = '/build/editor.css';
	wp_register_style(
		'arvernus-apple-maps-block-editor-styles',
		_get_plugin_url() . $editor_style_path,
		[],
		APPLE_MAPS_BLOCK_CURRENT_VERSION
    );
	
	wp_set_script_translations( 'jsforwp-callout-block', 'jsforwp', plugin_dir_path( __FILE__ ) . 'languages/' );

    register_block_type( 'arvernus/apple-maps-block', array(
		'editor_script' => 'arvernus-apple-maps-block',
		'editor_style' => 'arvernus-apple-maps-block-editor-styles',
		'style' => 'arvernus-apple-maps-block-styles',
	) );
    
}


add_action('init', __NAMESPACE__.'\enqueue_frontend_assets');

/**
 * Enqueue frontend JavaScript and CSS assets.
 */
function enqueue_frontend_assets() {

	// If in the backend, bail out.
	if ( is_admin() ) {
		return;
	}

	$block_path = '/build/frontend.js';
	wp_enqueue_script(
		'arvernus-apple-maps-blocks-frontend',
		_get_plugin_url() . $block_path,
		[ 'wp-dom-ready', 'wp-api-fetch' ],
		APPLE_MAPS_BLOCK_CURRENT_VERSION
	);
}