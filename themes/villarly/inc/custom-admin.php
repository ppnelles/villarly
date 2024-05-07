<?php 
/**
 * changing logo on admin page
 */
function custom_login_logo() { ?>
    <style type="text/css">
        #login h1 a, 
        .login h1 a {
	        background-image: url('<?php echo get_stylesheet_directory_uri(); ?>/img/admin-logo.png');
	        width: 320px;
	        height: 140px;
	        background-size: contain;
	        background-repeat: no-repeat;
        }
    </style>
<?php }
add_action('login_enqueue_scripts', 'custom_login_logo');

function custom_login_logo_url() {
    return home_url();
}
add_filter( 'login_headerurl', 'custom_login_logo_url' );


if(current_user_can('editor')) {
add_action('admin_head', 'my_custom_fonts');

function my_custom_fonts() {
  echo '<style>
    #menu-posts,
    #menu-users,
    #menu-tools,
    #menu-posts-calendar,
    #toplevel_page_edit-post_type-acf-field-group,
    #toplevel_page_members,
    #toplevel_page_smush,
    #toplevel_page_theme-general-settings,
    #menu-settings {
      display: none;
    } 
  </style>';
}
}