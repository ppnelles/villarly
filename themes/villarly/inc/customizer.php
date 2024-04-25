<?php
/**
 * _turbo Theme Customizer
 *
 * @package _turbo
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function _turbo_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial( 'blogname', array(
			'selector'        => '.site-title a',
			'render_callback' => '_turbo_customize_partial_blogname',
		) );
		$wp_customize->selective_refresh->add_partial( 'blogdescription', array(
			'selector'        => '.site-description',
			'render_callback' => '_turbo_customize_partial_blogdescription',
		) );
	}
}
add_action( 'customize_register', '_turbo_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function _turbo_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function _turbo_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function _turbo_customize_preview_js() {
	wp_enqueue_script( '_turbo-customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '20151215', true );
}
add_action( 'customize_preview_init', '_turbo_customize_preview_js' );

// Set up the WordPress core custom background feature.
add_theme_support( 'custom-background', apply_filters( '_turbo_custom_background_args', array(
	'default-color' => 'ffffff',
	'default-image' => '',
) ) ); */

// Add theme support for selective refresh for widgets.
//add_theme_support( 'customize-selective-refresh-widgets' );

/**
 * Add support for core custom logo.
 *
 * @link https://codex.wordpress.org/Theme_Logo
 */
add_theme_support( 'custom-logo', array(
	'height'      => 250,
	'width'       => 250,
	'flex-width'  => true,
	'flex-height' => true,
) );