<?php
/**
 * _turbo functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package _turbo
 */

require get_template_directory() . '/inc/setup.php';
require get_template_directory() . '/inc/performance.php';
require get_template_directory() . '/inc/template-functions.php';
require get_template_directory() . '/inc/template-tags.php';
require get_template_directory() . '/inc/custom-admin.php';
require get_template_directory() . '/inc/custom-posts.php';
require get_template_directory() . '/inc/enqueue.php';
require get_template_directory() . '/inc/theme-options.php';
require get_template_directory() . '/inc/user-roles.php';

//require get_template_directory() . '/inc/plugins/woocommerce.php';
//require get_template_directory() . '/inc/plugins/yoast.php';
//require get_template_directory() . '/inc/plugins/w3tc.php';

/*if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}*/

// Wordpress user custom things I think I'll never need
//require get_template_directory() . '/inc/custom-header.php';
//require get_template_directory() . '/inc/customizer.php';
//require get_template_directory() . '/inc/dynamic-sidebar.php';


