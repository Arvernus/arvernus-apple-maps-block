<?php
/**
 * Plugin Name: Apple Maps Block
 * Description: Creates a Gutenberg Block of the Apple MapKit JS library.
 * Author: Arvernus.info
 * Author URI: https://arvernus.info
 * Text Domain: apple_maps__gutenberg_block
 * Version: 1.0.1
 */

namespace Arvernus\Apple_Maps_Gutenberg_Block;

//  Exit if accessed directly.
defined('ABSPATH') || exit;

/**
 * Gets this plugin's absolute directory path.
 *
 * @since  2.1.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_directory() {
	return __DIR__;
}

/**
 * Gets this plugin's URL.
 *
 * @since  2.1.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_url() {
	static $plugin_url;

	if ( empty( $plugin_url ) ) {
		$plugin_url = plugins_url( null, __FILE__ );
	}

	return $plugin_url;
}

/**
 * Load plugin textdomain.
 *
 * @since 1.0.0
 */
function apple_maps__gutenberg_block_load_textdomain() {
	load_plugin_textdomain( 'apple_maps__gutenberg_block', false, basename( dirname( __FILE__ ) ) . '/languages' ); 
  }
  
  add_action( 'init', __NAMESPACE__ . '\apple_maps__gutenberg_block_load_textdomain' );

// Enqueue JS and CSS
include __DIR__ . '/lib/enqueue-scripts.php';

include __DIR__ . '/lib/jwt-auth.php';
include __DIR__ . '/lib/settings-endpoint.php';