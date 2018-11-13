<?php
/**
 * Plugin Name: Apple Maps - Gutenberg Block
 * Description: Creates a Gutenberg Block of the Apple MapKit JS library.
 * Author: Arvernus.info
 * Author URI: https://arvernus.info
 * Version: 1.0.0
 *
 * @package arvernusblocks
 */

//  Exit if accessed directly.
defined('ABSPATH') || exit;

define( 'MAPKITJSSERVER_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

function mapkitblock_projectcpt_blocks() {
  /**
   * Initialize the blocks
   */
  require_once MAPKITJSSERVER_PLUGIN_PATH . 'gutenberg.php';
}
add_action( 'init', 'mapkitblock_projectcpt_blocks' );

require_once MAPKITJSSERVER_PLUGIN_PATH . 'customizer.php';
require_once MAPKITJSSERVER_PLUGIN_PATH . 'jwt-auth.php';