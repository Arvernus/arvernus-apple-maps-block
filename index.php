<?php
/**
 * Plugin Name: Apple Maps Block
 * Description: Creates a Gutenberg Block of the Apple MapKit JS library.
 * Author: Arvernus.info
 * Author URI: https://arvernus.info
 * Text Domain: arvernus-apple-maps-block
 * Domain Path: /languages
 * Version: 1.0.12
 */

namespace Arvernus\Apple_Maps_Block;

//  Exit if accessed directly.
defined('ABSPATH') || exit;


$plugin_data = get_file_data(__FILE__, array('Version' => 'Version'), false);
$plugin_version = $plugin_data['Version'];

define ( 'APPLE_MAPS_BLOCK_CURRENT_VERSION', $plugin_version );

add_action( 'plugins_loaded', __NAMESPACE__.'\arvernus_load_textdomain' );

function arvernus_load_textdomain() {
	load_plugin_textdomain('arvernus-apple-maps-block', false, basename( dirname( __FILE__ ) ) . '/languages/');
}



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

define ( 'PLUGIN_ROOT', _get_plugin_url(__FILE__) );

// Enqueue JS and CSS
include __DIR__ . '/lib/enqueue-scripts.php';

include __DIR__ . '/lib/jwt-auth.php';
include __DIR__ . '/lib/settings-endpoint.php';