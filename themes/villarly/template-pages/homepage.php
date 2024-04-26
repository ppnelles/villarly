<?php
/**
 * Template Name: homepage
 *
 * @package _turbo
 */

get_header();
?>

<main id="primary" class="site-main" role="main" itemprop="mainContentOfPage">

    <section id="showreel">
        <video id="showreel-intro-horizontal" autoplay loop muted playsinline>
            <source src="<?php bloginfo('template_directory'); ?>/video/intro_h.mp4" type="video/mp4">
        </video>
        <video id="showreel-intro-vertical" autoplay loop muted playsinline>
             <source src="<?php bloginfo('template_directory'); ?>/video/intro_v.mp4" type="video/mp4">
        </video>
        <div class="content">
        	<figure>
        		<img src="<?php bloginfo('template_directory'); ?>/img/villarly-hb-blanc.svg" alt="Villarly en Haut et en Bas">
        	</figure>
        	<h1>Villarly - Appartements à louer</h1>
        </div>
        <div class="scroll-down">
            <div class="mouse">
                <div class="scroller"></div>
            </div>
            <div class="label">Scroll down</div>
        </div>  
    </section>

    <section id="situation">
    	<div class="inner">
    		<div class="content">
    			<h2><?php the_field( 'sit_title' ); ?></h2>
    			<div><?php the_field( 'sit_content' ); ?></div>
    		</div>
    		<div class="map">
    			<iframe wframeborder="0" allowfullscreen allow="geolocation" src="//umap.openstreetmap.fr/fr/map/carte-sans-nom_1061171?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&editMode=disabled&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true"></iframe>
    		</div>
    	</div>
    </section>

    <h2 id="appartements"><?php the_field( 'app_title' ); ?></h2>

    <section id="en-bas">
    	<div class="inner">
	    	<div class="content">
	    		<?php //ACF field must be set as ID
	    		if(get_field('bas_logo')) { ?>
	    			<figure>
	    				<?php echo wp_get_attachment_image(get_field('bas_logo'), 'full'); ?>
	    			</figure>
	    		<?php } ?>
	    		<div><?php the_field( 'bas_content' ); ?></div>
	    	</div>
    	</div>
    </section>

    <section id="en-haut">
    	<div class="inner">
	    	<div class="content">
	    		<?php //ACF field must be set as ID
	    		if(get_field('haut_logo')) { ?>
	    			<figure>
	    				<?php echo wp_get_attachment_image(get_field('haut_logo'), 'full'); ?>
	    			</figure>
	    		<?php } ?>
	    		<div><?php the_field( 'haut_content' ); ?></div>
	    	</div>
    	</div>
    </section>

    <div class="more-info">
    	<section id="equipements">
    		<h2><?php the_field( 'equ_title' ); ?></h2>
    		<div><?php the_field( 'equ_content' ); ?></div>
    	</section>
    	<section id="tarifs">
    		<h2><?php the_field( 'tar_title' ); ?></h2>
    		<div><?php the_field( 'tar_content' ); ?></div>
    	</section>
    </div>

    <section id="reservations">
    	<div class="inner">
    		<header>
    			<h2><?php the_field( 'res_title' ); ?></h2>
    			<div><?php the_field( 'res_content' ); ?></div>
    		</header>
    		<p class="temp">En cours de dev =)</p>
    	</div>
    </section>

    <section id="contact">
    	<div class="content">
    		<h2><?php the_field( 'con_title' ); ?></h2>
    		<div class="intro"><?php the_field( 'con_intro' ); ?></div>

			<div id="form-saved">
				<?php the_field( 'form_saved' ); ?>
			</div>

			<form id="add-entry-form" 
			        name="add-entry-form" 
			        method="post"
			        action="<?php echo admin_url( 'admin-ajax.php' ); ?>" 
			        class="js-add-entry-form"
			        >
	            <input type="hidden" class="form-action" name="action" value="add_ajax_entry_form">
	            <div class="form-field">
	                <input required type="text" name="name" id="name" placeholder="Votre nom & prénom">
	            </div>
	            <div class="form-field">
	                <input required type="email" name="email" id="email" placeholder="Votre adresse email">
	            </div>
	            <div class="form-field">
	                <input required type="text" name="phone" id="phone" placeholder="Votre numéro de téléphone">
	            </div>

	            <div class="form-field type-selector">
	            	<div>
	            		<input class="check-message" type="checkbox" id="check-message" checked="checked">
	                	<label class="check-message" for="check-message">Je souhaite envoyer un message ou poser une question</label>
	            	</div>
	            	<div>
	            		<input class="check-reservation" type="checkbox" id="check-reservation">
	                	<label class="check-reservation" for="check-reservation">Je souhaite effectuer une demande de réservation</label>
	            	</div>
	            </div>

	            <div class="form-field your-reservation">
	            	<div>
	            		<label for="startdate">Date d'arrivée:</label>
	            		<input type="date" name="startdate" id="startdate">
	            	</div>
	            	<div>
	            		<label for="staylength">Durée du séjour:</label>
	            		<select name="staylength" id="staylength" required>
	            			<option>Sélectionner...</option>
	            			<option value="four-days">4 jours</option>
	            			<option value="a-week">7 jours</option>
	            		</select>
	            	</div>
	            	<div class="group-composition">
	            		<p>Composition du groupe:</p>
	            		<div>
	            			<input type="number" step="1" name="adults" id="adults" value="0">
	            			<label for="adults">adultes</label>
	            		</div>
	            		<div>
	            			<input type="number" step="1" name="children" id="children" value="0">
	            			<label for="adults">enfants</label>
	            		</div>
	            	</div>
	            </div>

	            <div class="form-field your-message">
	                <textarea id="message" name="message">Votre message</textarea>
	            </div>

	            
	            <div class="form-submit">
	                <button class="add-entry-button">Envoyer</button>
	                <p class="wait">Merci de patienter pendant le traitement de votre demande...</p>
	            </div>
	        </form>

    	</div>
    	<?php //ACF field must be set as ID
    	if(get_field('con_img')) { ?>
    		<figure>
    			<?php echo wp_get_attachment_image(get_field('con_img'), 'full'); ?>
    		</figure>
    	<?php } ?>
    </section>

</main><!-- #main -->

<?php
//get_sidebar();
get_footer();