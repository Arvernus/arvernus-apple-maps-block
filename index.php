<?php
/**
 * Plugin Name: Apple Maps Block
 * Description: Creates a Gutenberg Block of the Apple MapKit JS library.
 * Author: Arvernus.info
 * Author URI: https://arvernus.info
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

// Enqueue JS and CSS
include __DIR__ . '/lib/enqueue-scripts.php';

include __DIR__ . '/lib/jwt-auth.php';
include __DIR__ . '/lib/jwt-auth-v2.php';
include __DIR__ . '/lib/customizer.php';

