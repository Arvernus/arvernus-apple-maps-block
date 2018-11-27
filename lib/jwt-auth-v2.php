<?php
//  Exit if accessed directly.
defined('ABSPATH') || exit;

// Register the Plugin
//
add_action( 'rest_api_init', function () {
	register_rest_route( 'AppleMapKit/v2', '/GetJWT', array(
		'methods' => 'GET',
		'callback' => 'MapKitGetJWTJSON',
	) );
} );



// Generate an Apple MapKit JWT
//
function MapKitGetJWTJSON( $data ) {
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
	return new WP_REST_Response ( "{value:".$Res."}", 200 );
}

?>
