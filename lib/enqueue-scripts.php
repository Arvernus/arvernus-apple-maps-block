<?php

namespace Arvernus\Apple_Maps_Block;

add_action('init', __NAMESPACE__.'\register_block_assets');

function register_block_assets() {

	wp_enqueue_script('apple-mapkit-js', "https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js", [], 5, false);

	$block_path = '/assets/js/editor.blocks.js';
	wp_register_script(
		'arvernus-apple-maps-block',
		PLUGIN_ROOT . $block_path,
		[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor', 'apple-mapkit-js' ],
		APPLE_MAPS_BLOCK_CURRENT_VERSION
	);

	$style_path = '/assets/css/blocks.style.css';
	wp_register_style(
		'arvernus-apple-maps-block-styles',
		PLUGIN_ROOT . $style_path,
		[],
		APPLE_MAPS_BLOCK_CURRENT_VERSION
	);
	
	$editor_style_path = '/assets/css/blocks.editor.css';
	wp_register_style(
		'arvernus-apple-maps-block-editor-styles',
		PLUGIN_ROOT . $editor_style_path,
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

function enqueue_frontend_assets() {

	// If in the backend, bail out.
	if ( is_admin() ) {
		return;
	}

	$block_path = '/assets/js/frontend.blocks.js';
	wp_enqueue_script(
		'arvernus-apple-maps-blocks-frontend',
		PLUGIN_ROOT . $block_path,
		[ 'wp-dom-ready', 'apple-mapkit-js' ],
		APPLE_MAPS_BLOCK_CURRENT_VERSION
	);
}