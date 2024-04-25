<?php

// Editeurs peuvent editer le menu Apparence
$role_object = get_role( 'editor' );
$role_object->add_cap( 'edit_theme_options' );

// Masquer certaines pages
function hide_menu() {

    if (current_user_can('editor')) {

        remove_submenu_page( 'themes.php', 'themes.php' ); // hide the theme selection submenu
        remove_submenu_page( 'themes.php', 'widgets.php' ); // hide the widgets submenu
    }
}

add_action('admin_head', 'hide_menu');

// Editeur peuvent accéder à flamingo
function my_flamingo_caps($caps) {
	// To customize for any capability, change 'edit_users' to another capability as desired:
	$new_caps = array(
		'flamingo_edit_contact' => 'edit_pages',
		'flamingo_edit_contacts' => 'edit_pages',
		'flamingo_delete_contact' => 'edit_pages',
		'flamingo_edit_inbound_message' => 'edit_pages',
		'flamingo_edit_inbound_messages' => 'edit_pages',
		'flamingo_delete_inbound_message' => 'edit_pages',
		'flamingo_delete_inbound_messages' => 'edit_pages',
		'flamingo_spam_inbound_message' => 'edit_pages',
		'flamingo_unspam_inbound_message' => 'edit_pages',
		'flamingo_edit_outbound_message' => 'edit_pages',
		'flamingo_edit_outbound_messages' => 'edit_pages',
		'flamingo_delete_outbound_message' => 'edit_pages',
	);

	return array_merge($caps, $new_caps);
}

add_filter('flamingo_map_meta_cap', 'my_flamingo_caps');