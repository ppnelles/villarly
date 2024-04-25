<?php

/*
*
* Capabilities for editor to edit GDPR pages
*
*/

add_action('map_meta_cap', 'custom_manage_privacy_options', 1, 4);
function custom_manage_privacy_options($caps, $cap, $user_id, $args)
{
  if (!is_user_logged_in()) return $caps;

  $user_meta = get_userdata($user_id);
  if (array_intersect(['editor', 'administrator'], $user_meta->roles)) {
    if ('manage_privacy_options' === $cap) {
      $manage_name = is_multisite() ? 'manage_network' : 'manage_options';
      $caps = array_diff($caps, [ $manage_name ]);
    }
  }
  return $caps;
}

/* 
* Adding custom image size
* add_image_size( string $name, int $width, int $height, bool|array $crop = false )
* https://developer.wordpress.org/reference/functions/add_image_size/
*/

// add_action( 'after_setup_theme', '_turbo_image_size' );

// function _turbo_image_size() {
// 	add_image_size( 'hero-homepage', 1800, 1200, true );
//     //add_image_size( 'card-slider', 460, 320, true );
// }