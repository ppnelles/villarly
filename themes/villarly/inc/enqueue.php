<?php /**
 * Enqueue scripts and styles.
 */
function _turbo_scripts() {
	wp_enqueue_style( '_turbo-style', get_stylesheet_uri() );

	//wp_enqueue_script( '_turbo-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	//wp_enqueue_script( '_turbo-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	//wp_enqueue_script( 'wpml-legacy-dropdown.js', get_template_directory_uri() . '/js/wpml/legacy-dropdown.js', '20200109', true );

	wp_deregister_script('jquery');
	wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', array(), null, true);

	wp_enqueue_script( '_turbo-scripts', get_template_directory_uri() . '/js/scripts-min.js', array(), '20200101', true );


	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}

add_action( 'wp_enqueue_scripts', '_turbo_scripts' );