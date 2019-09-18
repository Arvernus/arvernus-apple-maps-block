<?php

namespace Arvernus\Apple_Maps_Block;

add_action('init', __NAMESPACE__.'\register_block_assets');

function register_block_assets() {

	wp_enqueue_script('apple-mapkit-js', "https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js", [], 5, false);

	$block_path = "/build/index.js";
    $script_dependencies = ( include _get_plugin_directory() . '/build/index.asset.php' );
	wp_register_script(
		'arvernus-apple-maps-block',
		PLUGIN_ROOT . $block_path,
		array_merge( $script_dependencies['dependencies'], ['apple-mapkit-js'] ),
		$script_dependencies['version']
	);

	$style_path = '/style.css';
	wp_register_style(
		'arvernus-apple-maps-block-styles',
		PLUGIN_ROOT . $style_path,
		[],
		APPLE_MAPS_BLOCK_CURRENT_VERSION
	);
	
	$editor_style_path = '/editor.css';
	wp_register_style(
		'arvernus-apple-maps-block-editor-styles',
		PLUGIN_ROOT . $editor_style_path,
		[],
		APPLE_MAPS_BLOCK_CURRENT_VERSION
    );
	
	wp_set_script_translations( 'arvernus-apple-maps-block', 'arvernus-apple-maps-block', plugin_dir_path( __FILE__ ) . 'languages/' );

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

	$frontend_path = '/build/frontend.js';
	$frontend_dependencies = ( include _get_plugin_directory() . '/build/frontend.asset.php' );
	wp_enqueue_script(
		'arvernus-apple-maps-blocks-frontend',
		PLUGIN_ROOT . $frontend_path,
		array_merge( $frontend_dependencies['dependencies'], ['apple-mapkit-js'] ),
		$frontend_dependencies['version']
	);
}