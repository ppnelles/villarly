<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _turbo
 */

?>
<?php if(get_field('is_offline','option') == true) :
	global $current_user;
	get_currentuserinfo();

	if(!current_user_can( 'edit_posts' )) :
		die('Site en maintenace.');
	endif;
endif; ?>	
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="HandheldFriendly" content="true" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<meta name="author" content="AUTHOR NAME" />

	<?php get_template_part( 'template-parts/google', 'head' ); ?>

	<?php wp_head(); ?>
	<?php get_template_part('/template-parts/content', 'favicons' ); ?>	
</head>

<body <?php body_class(); ?> role="document" itemscope="itemscope" itemtype="http://schema.org/WebPage">
<div id="page" class="site">
	<?php get_template_part( 'template-parts/google', 'body' ); ?>
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', '_turbo' ); ?></a>

	<header id="masthead" class="site-header" role="banner">
		<div class="inner">
			<div class="site-branding">
				<?php
				if ( is_page_template('template-pages/homepage.php') ) : ?>
					<h1 class="site-title" itemprop="name">
						<a href="#page" rel="home">
							<span><?php bloginfo( 'name' ); ?> - <?php bloginfo( 'description', 'display' )  ?>
							</span>
						</a>
					</h1>
					<?php
				else :
					?>
					<p class="site-title" itemprop="name">
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
							<span><?php bloginfo( 'name' ); ?> - <?php bloginfo( 'description', 'display' )  ?></span>
						</a>
					</p>
					<?php
				endif; ?>
				</div><!-- .site-branding -->

			<nav id="site-navigation" class="main-navigation">
				<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
					<span class="label"><?php esc_html_e( 'Primary Menu', '_turbo' ); ?></span>
					<span class="burger-line"></span>
					<span class="burger-line"></span>
					<span class="burger-line"></span>
				</button>
				<div class="nav-inner">
					<div class="primary-menu">
						<?php wp_nav_menu( array( 'theme_location' => 'Primary') ); ?>
					</div>
					<div class="secondary-menu">
						<?php wp_nav_menu( array( 'theme_location' => 'Secondary') ); ?>
						<?php /* <div>
							<?php do_action('wpml_add_language_selector'); ?>
						</div> */ ?>
					</div>
				</div>
			</nav><!-- #site-navigation -->
		</div>
	</header><!-- #masthead -->

	<?php /* <div id="content" class="site-content"> */ ?>
