<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package _turbo
 */

get_header();
?>

<main id="primary" class="site-main" role="main" itemprop="mainContentOfPage">

	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> role="article">
		<?php get_template_part( 'template-parts/content', 'page' ); ?>
	</article>

</main><!-- #main -->

<?php
//get_sidebar();
get_footer();
