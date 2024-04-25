<?php
/**
 * Template Name: contact
 *
 * @package _turbo
 */

get_header();
?>

<main id="primary" class="site-main" role="main" itemprop="mainContentOfPage">

	<div class="storifier banner centered">
		<div class="content default">
			<h1 class="storifier-title main-title"><?php the_field( 'intro_title' ); ?></h1>
		</div>
	</div>

	<div class="contact-page">
		<div class="inner">
			<div class="content">
				<h2><?php the_field( 'contact_title' ); ?></h2>
				<div><?php the_field( 'content_content' ); ?></div>
				<address class="p-adr h-adr">
		        	<h2>Notre adresse</h2>
					<p class="p-name"><?php the_field( 'adress_name', 'option' ); ?></p>
					<p class="p-street-address"><?php the_field( 'adress_street', 'option' ); ?></p>
					<p><span class="p-postal-code"><?php the_field( 'adress_postcode', 'option' ); ?></span> <span class="p-locality"><?php the_field( 'adress_locality', 'option' ); ?></span>, <span class="p-country-name"><?php the_field( 'adress_country', 'option' ); ?></span></p>
					<p><a href="<?php the_field( 'adress_gmap_url', 'option' ); ?>" target="_blank"><?php _e( 'Google Maps','_turbo' ); ?></a></a>
					</p>
					<p class="parking"><?php the_field( 'adress_parking', 'option' ); ?></p>
		        </address>
			</div>
			<div class="the-form">
				<h2>Formulaire de contact</h2>
				<?php echo do_shortcode(get_field('contact_form')) ?>
			</div>
		</div>
	</div>

</main><!-- #main -->

<?php
//get_sidebar();
get_footer();