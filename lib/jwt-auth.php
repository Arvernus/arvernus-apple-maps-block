<?php
//  Exit if accessed directly.
defined('ABSPATH') || exit;

// Register the Plugin
//
add_action( 'rest_api_init', function () {
	register_rest_route( 'AppleMapKit/v1', '/GetJWT', array(
		'methods' => 'GET',
		'callback' => 'MapKitGetJWT',
	) );
} );


// URL safe base64 encoding
//
function MapKitEncode($data) {
	$Res = strtr(base64_encode($data), '+/', '-_');
	return rtrim($Res, '=');
}

// Generate an Apple MapKit JWT
//
function MapKitGetJWT( $data ) {

	$private_key = json_decode(get_option( 'apple_maps_private_key' ));

	$Header = [
		'alg' => 'ES256',
		'typ' => 'JWT',
		'kid' => json_decode(get_option( 'apple_maps_key_id' ))
	];
	$Body = [
		'iss' => json_decode(get_option( 'apple_maps_team_id' )),
		'iat' => time(),
		'exp' => time() + 30
	];
	$Payload = json_encode($Header) . '.' . json_encode($Body);
	if(!$Key = openssl_pkey_get_private($private_key)) {
		return new WP_Error( 'NoKey', 'Missing or Invalid Private Key' );
	}
	if(!openssl_sign($Payload, $Res, $Key, OPENSSL_ALGO_SHA256)) {
		return new WP_Error( 'SignError', 'Signing Failed' );
	}
	$Res = MapKitEncode($Payload);
	return $Res;
}

?>
