<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package _turbo
 */

get_header();
?>

<main id="primary" class="site-main" role="main" itemprop="mainContentOfPage">

	<section class="error-404 not-found">
		<div class="inner">	
			<div class="content">
				<div>
					<h1 class="page-title"><?php _e( "Page Not Found", '_turbo' ); ?></h1>
					<p><?php _e( "The page you were looking for could not be found. It might have been removed, renamed, or did not exist in the first place. Please go back to the homepage or contact us.", '_turbo' ); ?>
					</p>
					<div class="cta">
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn"><?php _e("Homepage","_turbo") ?></a>
						<a href="/contact/" class="btn"><?php _e('Contact us','_turbo') ?></a>
					</div>
				</div>
				<?php /* <figure>
					<img src="<?php bloginfo('template_directory'); ?>/img/error404.png" alt="Erreur 404">
				</figure> */ ?>
			</div><!-- .page-content -->
		</div>
	</section><!-- .error-404 -->

</main><!-- #main -->

<?php
get_footer();
