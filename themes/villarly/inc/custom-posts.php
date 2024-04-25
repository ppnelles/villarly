<?php

add_action('init', 'create_cp');

function create_cp() {

	// register_post_type('popup', array(
	// 	 'label' => __('Pop up'),
	// 	 'singular_label' => __('Pop up'),
	// 	 'public' => true,
	// 	 'show_ui' => true,
	// 	 'show_in_menu' => true,
	// 	 'menu_position' => 22,
	// 	 'capability_type' => 'post',
	// 	 'hierarchical' => false,
	// 	 'has_archive' => false,
	// 	 'supports' => array('title', 'revisions'),
	// 	 //'menu_icon' => 'dashicons-groups'
	// ));

	/*$labels = array(
		'name'              => _x( 'Types de productions', 'taxonomy general name' ),
		'singular_name'     => _x( 'Type de production', 'taxonomy singular name' ),
		'search_items'      => __( 'Rechercher' ),
		'all_items'         => __( 'Tous les types' ),
		'parent_item'       => __( 'Parent' ),
		'parent_item_colon' => __( 'Parent:' ),
		'edit_item'         => __( 'Editer' ),
		'update_item'       => __( 'Sauvegarder' ),
		'add_new_item'      => __( 'Ajouter un type de production' ),
		'new_item_name'     => __( 'Ajouter un type de production' ),
		'menu_name'         => __( 'Productions' ),
	);

	$args = array(
		'hierarchical'      => false,
		'labels'            => $labels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'meta_box_cb'		=> false
	);
	register_taxonomy( 'prod-type', array( 'producteurs' ), $args );*/
}



add_action('acf/init', 'my_acf_op_init');

function my_acf_op_init() {
	if( function_exists('acf_add_options_page') ) {

		acf_add_options_page(array(
		    'page_title'     => 'Config générale',
		    'menu_title'    => 'Config générale',
		    'capability'    => 'edit_posts',
		    'menu_slug'     => 'theme-general-settings',
		    //'parent_slug'    => 'edit.php?post_type=POST-TYPE',
		));

		// acf_add_options_page(array(
		//     'page_title'     => 'Page Listing - Activités',
		//     'menu_title'    => 'Listing activités',
		//     'capability'    => 'edit_posts',
		//     //'menu_slug'     => 'theme-general-settings',
		//     'parent_slug'    => 'edit.php?post_type=activites',
		// ));
	}
}