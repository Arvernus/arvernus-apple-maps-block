<?php

namespace Arvernus\Apple_Maps_Block;

add_action('init', __NAMESPACE__.'\register_block_assets');

function register_block_assets() {

	wp_enqueue_script('apple-mapkit-js', "https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js", [], 5, false);

	$block_path = "/build/index.js";
	$script_deps_path = _get_plugin_directory() . '/build/index.deps.json';
        $script_dependencies = file_exists( $script_deps_path )
        ? json_decode( file_get_contents( $script_deps_path ) )
        : [];
	wp_register_script(
		'arvernus-apple-maps-block',
		PLUGIN_ROOT . $block_path,
		array_merge( $script_dependencies, ['apple-mapkit-js'] ),
		APPLE_MAPS_BLOCK_CURRENT_VERSION
	);

	$style_path = '/build/style.css';
	wp_register_style(
		'arvernus-apple-maps-block-styles',
		PLUGIN_ROOT . $style_path,
		[],
		APPLE_MAPS_BLOCK_CURRENT_VERSION
	);
	
	$editor_style_path = '/build/editor.css';
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
	$script_deps_path = _get_plugin_directory() . '/build/frontend.deps.json';
        $script_dependencies = file_exists( $script_deps_path )
        ? json_decode( file_get_contents( $script_deps_path ) )
        : [];
	wp_enqueue_script(
		'arvernus-apple-maps-blocks-frontend',
		PLUGIN_ROOT . $frontend_path,
		array_push( json_decode($frontend_dependencies), 'apple-mapkit-js' ),
		APPLE_MAPS_BLOCK_CURRENT_VERSION
	);
}