<?php
/**
 * Template Name: gdrp
 *
 * @package _turbo
 */

get_header();
?>

<main id="primary" class="site-main" role="main" itemprop="mainContentOfPage">
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> role="article">
        <?php the_content(); ?>
    </article>
</main><!-- #main -->

<?php
//get_sidebar();
get_footer();