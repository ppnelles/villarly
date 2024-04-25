<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _turbo
 */

?>

	<?php /* </div><!-- #content --> */ ?>

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="site-info">
			<?php // wp_nav_menu( array( 'theme_location' => 'Footer') ); ?>
			<?php /* <address class="p-adr h-adr">
				<p class="p-name"><?php the_field( 'adress_name', 'option' ); ?></p>
				<p class="p-street-address"><?php the_field( 'adress_street', 'option' ); ?></p>
				<p><span class="p-postal-code"><?php the_field( 'adress_postcode', 'option' ); ?></span> <span class="p-locality"><?php the_field( 'adress_locality', 'option' ); ?></span>, <span class="p-country-name"><?php the_field( 'adress_country', 'option' ); ?></span></p>
				<p><a class="contact-phone p-tel tel" href="tel:<?php the_field( 'contact_phone_robot','option' ); ?>"><?php the_field( 'contact_phone_human','option' ); ?></a></p>
				<p><a class="contact-mail p-email email" href="mailto:<?php the_field( 'contact_email','option' ); ?>"><?php the_field( 'contact_email','option' ); ?></a></p>
        	</address> */ ?>
			<div class="about">
				<span class="footer-name">© <?php bloginfo( 'name' ); ?></span> 

				<?php if(get_field('footer_info','option')): ?> 
					<span class="footer-info">
						<?php echo ' - '; the_field( 'footer_info','option' ); ?>	
					</span> 
				<?php endif; ?> 

				<span class="footer-privacy">- <?php echo get_the_privacy_policy_link(); ?></span>
			</div>
			<div class="made-by">
				<a href="https://www.getin.agency/" title="<?php _e('Website by GET IN Agency','_turbo') ?>"><span><?php _e('Website by GET IN Agency','_turbo') ?></span></a>
			</div>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->


<?php //get_template_part('template-parts/content','popup'); ?>

<?php get_template_part('template-parts/content','cookie'); ?>

<?php wp_footer(); ?>

</body>
</html>
