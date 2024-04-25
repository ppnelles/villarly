<?php
/**
 * _turbo Performance Enhancer
 *
 * @package _turbo
 */

/**
 * Stripping all the things that I don't need
 *
 */

function head_stripper() {
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_generator');
    //remove_action('wp_head', 'feed_links', 2);
    //remove_action('wp_head', 'feed_links_extra', 3);
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'wp_print_styles');
    remove_action('wp_head', 'wp_print_head_scripts');
    remove_action('wp_head', 'recent_comments_style');
    remove_filter('wp_head', 'wp_widget_recent_comments_style', 1);


    //Remove the REST API endpoint.
    remove_action('rest_api_init', 'wp_oembed_register_route');
     
    // Turn off oEmbed auto discovery.
    add_filter( 'embed_oembed_discover', '__return_false' );
     
    //Don't filter oEmbed results.
    remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);
     
    //Remove oEmbed discovery links.
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
     
    //Remove oEmbed JavaScript from the front-end and back-end.
    remove_action('wp_head', 'wp_oembed_add_host_js');


    global $wp_widget_factory;
    if (isset($wp_widget_factory->widgets['WP_Widget_Recent_Comments'])) {
        remove_action('wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));
    }

    //Removing emoji
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');

    //Removing style & scripts from CF7
    wp_deregister_style( 'contact-form-7' );
    // wp_deregister_script( 'contact-form-7' );

    // Removing style & scripts from WPML :
    if (!empty($GLOBALS['sitepress'])) {
        add_action('wp_head', function () {
            remove_action(
                current_filter(),
                array($GLOBALS['sitepress'], 'meta_generator_tag')
            );
        },
            0
        );
        define('ICL_DONT_LOAD_NAVIGATION_CSS', true);
        define('ICL_DONT_LOAD_LANGUAGE_SELECTOR_CSS', true);
        define('ICL_DONT_LOAD_LANGUAGES_JS', true);
    }

}

function remove_wp_version_rss() {
    return '';
}

add_action('init', 'head_stripper');
add_filter('the_generator', 'remove_wp_version_rss');

function mycustomfunc_remove_css_section( $wp_customize ) {	
	$wp_customize->remove_section( 'custom_css' );
}
add_action( 'customize_register', 'mycustomfunc_remove_css_section', 15 );

/* Remove Apparence -> customize */
function remove_customize() {
    $customize_url_arr = array();
    $customize_url_arr[] = 'customize.php'; // 3.x
    $customize_url = add_query_arg( 'return', urlencode( wp_unslash( $_SERVER['REQUEST_URI'] ) ), 'customize.php' );
    $customize_url_arr[] = $customize_url; // 4.0 & 4.1
    if ( current_theme_supports( 'custom-header' ) && current_user_can( 'customize') ) {
        $customize_url_arr[] = add_query_arg( 'autofocus[control]', 'header_image', $customize_url ); // 4.1
        $customize_url_arr[] = 'custom-header'; // 4.0
    }
    if ( current_theme_supports( 'custom-background' ) && current_user_can( 'customize') ) {
        $customize_url_arr[] = add_query_arg( 'autofocus[control]', 'background_image', $customize_url ); // 4.1
        $customize_url_arr[] = 'custom-background'; // 4.0
    }
    foreach ( $customize_url_arr as $customize_url ) {
        remove_submenu_page( 'themes.php', $customize_url );
    }
}
add_action( 'admin_menu', 'remove_customize', 999 );

// Interdire de modifier le code des thèmes et plugins depuis l'admin
define( 'DISALLOW_FILE_EDIT', true );
//define( 'DISALLOW_FILE_MODS', true );