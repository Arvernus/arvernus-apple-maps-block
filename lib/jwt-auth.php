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
	$Header = [
		'alg' => 'ES256',
		'typ' => 'JWT',
		'kid' => get_theme_mod('MapKitKeyID')
	];
	$Body = [
		'iss' => get_theme_mod('MapKitTeamID'),
		'iat' => time(),
		'exp' => time() + get_theme_mod('MapKitExpirationTime')
	];
	$Payload = MapKitEncode(json_encode($Header)) . '.' . MapKitEncode(json_encode($Body));
	if(!$Key = openssl_pkey_get_private(get_theme_mod('MapKitPrivatKey'))) {
		return new WP_Error( 'NoKey', 'Missing or Invalid Private Key' );
	}
	if(!openssl_sign($Payload, $Res, $Key, OPENSSL_ALGO_SHA256)) {
		return new WP_Error( 'SignError', 'Signing Failed' );
	}
	$Res = $Payload . '.' . MapKitEncode($Res);
	return new WP_REST_Response ( $Res, 200 );
}

?>
