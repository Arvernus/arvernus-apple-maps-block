<?php

define( 'APPLEMAPKIT_REST_NAMESPACE', 'AppleMapKit/v1' );
define( 'APPLEMAPKIT_REST_OPTION', 'jsforwpadvgb_maps_api_key');


add_action( 'rest_api_init',  'custom_endpoints' );
/**
 * Enqueue block editor only JavaScript and CSS.
 */
function custom_endpoints() {
    register_rest_route( 
        'AppleMapKit/v1', '/private_key',
        [
            'methods'  => \WP_REST_Server::EDITABLE,            
            'callback' =>  'update_apple_maps_private_key',
            'permission_callback' =>  'check_permissions'
        ]
    );

    register_rest_route( 
        'AppleMapKit/v1', '/private_key/get',
        [
            'methods'  => "GET",            
            'callback' =>  'get_apple_maps_private_key',
            'permission_callback' =>  'check_permissions'
        ]
    );

    register_rest_route( 
        'AppleMapKit/v1', '/team_id',
        [
            'methods'  => \WP_REST_Server::EDITABLE,            
            'callback' =>  'update_apple_maps_team_id',
            'permission_callback' =>  'check_permissions'
        ]
    );

    register_rest_route( 
        'AppleMapKit/v1', '/team_id/get',
        [
            'methods'  => "GET",            
            'callback' =>  'get_apple_maps_team_id',
            'permission_callback' =>  'check_permissions'
        ]
    );

    register_rest_route( 
        'AppleMapKit/v1', '/key_id',
        [
            'methods'  => \WP_REST_Server::EDITABLE,            
            'callback' =>  'update_apple_maps_key_id',
            'permission_callback' =>  'check_permissions'
        ]
    );

    register_rest_route( 
        'AppleMapKit/v1', '/key_id/get',
        [
            'methods'  => "GET",            
            'callback' =>  'get_apple_maps_key_id',
            'permission_callback' =>  'check_permissions'
        ]
    );
}

function get_apple_maps_private_key( $request ) {
    $private_key = get_option( 'apple_maps_private_key' );
    $response = new \WP_REST_Response( $private_key );
    $response->set_status(201);

    return $response;
}

function get_apple_maps_team_id( $request ) {
    $team_id = get_option( 'apple_maps_team_id' );
    $response = new \WP_REST_Response( $team_id );
    $response->set_status(201);

    return $response;
}

function get_apple_maps_key_id( $request ) {
    $key_id = get_option( 'apple_maps_key_id' );
    $response = new \WP_REST_Response( $key_id );
    $response->set_status(201);

    return $response;
}

function update_apple_maps_private_key( $request ) {
    
    $new_private_key = $request->get_body();
    update_option( 'apple_maps_private_key', $new_private_key );    

    $private_key = get_option( 'apple_maps_private_key' );
    $response = new \WP_REST_Response( $private_key );
    $response->set_status(201);

    return $response;
}

function update_apple_maps_team_id( $request ) {
    
    $new_team_id = $request->get_body();
    update_option( 'apple_maps_team_id', $new_team_id );    

    $team_id = get_option( 'apple_maps_team_id' );
    $response = new \WP_REST_Response( $team_id );
    $response->set_status(201);

    return $response;
}

function update_apple_maps_key_id( $request ) {
    
    $new_key_id = $request->get_body();
    update_option( 'apple_maps_key_id', $new_key_id );    

    $key_id = get_option( 'apple_maps_key_id' );
    $response = new \WP_REST_Response( $key_id );
    $response->set_status(201);

    return $response;
}

function check_permissions() {
    return current_user_can("edit_posts");
}