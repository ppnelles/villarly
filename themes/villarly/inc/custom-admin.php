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
