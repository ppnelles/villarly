<?php 
	$showPopup = false;
	$popShowOn = 0;

	
	if(get_field('pop_activ','option') == true && get_field('pop_allpages','option') == true):
		$showPopup = true;
	elseif(get_field('pop_activ','option') == true && get_field('pop_allpages','option') == false):
		$popShowOn = get_field('pop_showon','option');
		if(in_array($post->ID, $popShowOn, false)) {
			$showPopup = true;
		}
	endif;
	


	/*if(get_field('pop_activ','option') && get_field('pop_allpage','option') == true ) :
		$showPopup = true;
	elseif(get_field('pop_activ','option') && $popShowOn != false && in_array($post->ID, $popShowOn, false)) :
		$showPopup = true;
	endif;

	if*/

if($showPopup == true) : 


	$posts = get_field('pop_selected', 'option');


	if( $posts ):
		foreach( $posts as $post): // variable must be called $post (IMPORTANT) 
			setup_postdata($post);
			$popFormat = get_field('pop_format'); ?>
			
			<div id="popup" class="hidden <?php echo $popFormat; ?>">
				<?php if($popFormat == 'fullscreen'): ?>
					<div class="popup-bg"></div>
				<?php endif; ?>


				<div class="popup-content">
					<button class="popup-close"><span>X</span></button>
					
					<?php if(get_field('pop_title')): ?>
						<h2 class="pop-title"><?php the_field( 'pop_title'); ?></h2>
					<?php endif; ?>

					<?php if($popFormat == 'fullscreen' && get_field('pop_content_fullscreen')): ?>
						<div class="pop-inner">
							<?php the_field( 'pop_content_fullscreen'); ?>
						</div>
					<?php elseif($popFormat == 'bubble' && get_field('pop_content_bubble')): ?>
						<div class="pop-inner">
							<?php the_field( 'pop_content_bubble'); ?>
						</div>
					<?php endif; ?>

					<?php 
						$dataLayer='';
						$classes='';
						$htmlId='';

						if(get_field( 'pop__gtm_event' )):
							$dataLayer='onclick="dataLayer.push({\'event\': \''.get_field( 'pop__gtm_event' ).'\',\'eventCategory\': \''.get_field( 'pop_gtm__event_category' ).'\',\'eventAction\': \''.get_field( 'pop__gtm_event_action' ).'\',\'eventLabel\': \''.get_field( 'pop__gtm_event_label' ).'\'})"';
						endif; 

						if(get_field( 'pop__html_classes' )):
							$classes = get_field( 'pop__html_classes' );
						endif;

						if(get_field( 'pop__html_id' )):
							$htmlId = 'id="'.get_field( 'pop__html_id' ).'"';
						endif;

					?>

					<?php if(get_field('pop__btn_link') && get_field('pop__btn_title') ): ?>
						<div class="cta">
							<a href="<?php the_field( 'pop__btn_link' ); ?>" class="btn <?php echo $classes ?>" <?php echo $htmlId; echo $dataLayer; ?>>
								<?php the_field( 'pop__btn_title' ); ?>
							</a>
						</div>
					<?php endif; ?>

				</div>
			</div>

		<?php endforeach; 
		wp_reset_postdata();
	endif;
	
	
/*	if(get_field('pop_allpage','option') == false && in_array($post->ID, $popShowOn, false)) :

		echo "<h1>c'est oui</h1>";µ
	endif;*/
?>
<?php endif; ?>