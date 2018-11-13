<?php

function mapkit_customizer_register_settings( $wp_customize ) {

	$wp_customize->add_section( 'apple_maps' , array(
        'title'                 =>  'Apple Maps',
        'description'           =>  'Settings to create JSONWebToken for Apple MapKit JS Rest API.',
        'priority'              =>  30,
        ) );

	$wp_customize->add_setting( 'MapKitPrivatKey', array(
		'capability' => 'edit_theme_options',
		'default' => '',
		) );
	$wp_customize->add_control( 'MapKitPrivatKey', array(
		'type' => 'textarea',
		'section' => 'apple_maps',
		'label' => "Private Key",
		) );

	$wp_customize->add_setting( 'MapKitTeamID', array(
		'capability' => 'edit_theme_options',
		'default' => '',
		) );
	$wp_customize->add_control( 'MapKitTeamID', array(
		'type' => 'text',
		'section' => 'apple_maps',
		'label' => "Team Id",
		) );

	$wp_customize->add_setting( 'MapKitKeyID', array(
		'capability' => 'edit_theme_options',
		'default' => '',
		) );
	$wp_customize->add_control( 'MapKitKeyID', array(
		'type' => 'text',
		'section' => 'apple_maps',
		'label' => "Key Id",
		) );

	$wp_customize->add_setting( 'MapKitExpirationTime', array(
		'capability' => 'edit_theme_options',
		'default' => '30',
		) );
	$wp_customize->add_control( 'MapKitExpirationTime', array(
		'type' => 'text',
		'section' => 'apple_maps',
		'label' => "Key Expiration Time in seconds",
		) );

	$wp_customize->add_setting( 'MapKitDomainRestriction', array(
		'capability' => 'edit_theme_options',
		'default' => '',
		) );
	$wp_customize->add_control( 'MapKitDomainRestriction', array(
		'type' => 'text',
		'section' => 'apple_maps',
		'label' => "Domain Restriction",
		) );

}
add_action( 'customize_register', 'mapkit_customizer_register_settings' );