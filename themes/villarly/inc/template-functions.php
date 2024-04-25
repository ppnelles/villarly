<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package _turbo
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function _turbo_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

    if (function_exists('icl_object_id')) {
        $classes[] = ICL_LANGUAGE_CODE;
    }

    if (is_singular('post') || is_archive() || is_category() || is_single()) {
        $classes[] = 'blogs';
    }

	/*// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}
	else {
		$classes[] = 'with-sidebar';	
	}*/

	return $classes;
}
add_filter( 'body_class', '_turbo_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function _turbo_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', '_turbo_pingback_header' );
