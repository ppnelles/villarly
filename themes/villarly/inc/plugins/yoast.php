<?php

/*
* Overriding Yoast's og images for specific custom posts
*/

/*function change_og_image($object) {
	global $post;

	$ogImg = '';

	if (is_singular('producteurs')) {
		$ogImg = wp_get_attachment_image_url(get_field('farmer_pic',$post->ID),'large');
	}

	if (is_singular('recettes')) {
		$ogImg = wp_get_attachment_image_url(get_field('image',$post->ID),'large');
	}

	if($ogImg != '') {
		$object->add_image($ogImg);
	}
}*/

/*
* Remove Yoast's schema.org
*/

/*function bybe_remove_yoast_json($data){
$data = array();
return $data;
}
add_filter('wpseo_json_ld_output', 'bybe_remove_yoast_json', 10, 1);
*/

/*
* Create a cron to automaticaly flush w3_total_cache when you have dynamic content
* NOT SURE IT'S WORKING
*/

/*function w3_flush_cache( ) {
	$w3_plugin_totalcache->flush_pgcache();
}
*/