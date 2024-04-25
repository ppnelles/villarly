<?php
/**
 * Template Name: homepage
 *
 * @package _turbo
 */

get_header();
?>

<main id="primary" class="site-main" role="main" itemprop="mainContentOfPage">

	<section class="intro">

		<?php /* if ( have_rows( 'slides' ) ) : ?>
			<div class="slider-hero">
				<?php while ( have_rows( 'slides' ) ) : the_row(); ?>
					<div>
						<div class="hero-image">
							<?php //ACF field must be set as ID
							if(get_sub_field('int_bg')) {
								echo wp_get_attachment_image(get_sub_field('int_bg'), 'hero-homepage', '', array('class' => 'no-lazyload'));
							} ?>
						</div>
						<div class="hero-bg" style="background-image: url('<?php echo wp_get_attachment_image_url(get_sub_field("int_bg"), "hero-homepage"); ?>');"></div>
						<div class="hero-title">
							<div class="inner">
								<b><?php the_sub_field('int_title') ?></b>
							</div>
						</div>
					</div>
				<?php endwhile; ?>
			</div>
		<?php endif; */ ?>

		<?php /* <div class="fixed-hero">
			<div>
				<div class="hero-image">
					<?php //ACF field must be set as ID
					if(get_field('int_bg')) {
						echo wp_get_attachment_image(get_field('int_bg'), 'hero-homepage', '', array('class' => 'no-lazyload'));
					} ?>
				</div>
				<div class="hero-bg" style="background-image: url('<?php echo wp_get_attachment_image_url(get_field("int_bg"), "hero-homepage"); ?>');"></div>
				<div class="hero-title">
					<div class="inner">
						<b><?php the_field('int_title') ?></b>
					</div>
				</div>
			</div>
		</div> */ ?>
	</section>

</main><!-- #main -->

<?php
//get_sidebar();
get_footer();