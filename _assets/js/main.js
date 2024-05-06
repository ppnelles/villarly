jQuery(document).ready(function ($) {

	jQuery(".photo-gallery").owlCarousel({
		loop: false,
		nav: true,
		dots: false,
		autoplay: false,
		mouseDrag: true,
		touchDrag: true,
    margin: 0,
		responsive : {
		    0 : {
		        items: 1,
		    },
		    768 : {
    				autoWidth: true,
    				margin: 10,
		        items: 2,
		    },
		    992 : {
    				autoWidth: true,
    				margin: 20,
		        items: 3,
		    }
		}
	});

	jQuery('.simcal-month-nav').removeAttr("disabled");

	if (location.hash) location.href = location.hash;

	if (jQuery.cookie('hidecookie') != "hidden" ) {
		$('#cookiebanner').removeClass('hidden');
	}

	if (jQuery.cookie('hidepopup') != "hidden" ) {
		$('#popup').removeClass('hidden');
	}
	
	$('#cookiebanner button').click(function(event) {
      var date = new Date();
      date.setTime(date.getTime()+(360*24*60*60*1000));
      document.cookie = "hidecookie" + "=" + "hidden" + "; expires=" + date.toGMTString();

      $('#cookiebanner').addClass('hidden');
	});
	

})

lightbox.option({
  'albumLabel': "Image %1 sur %2",
})

jQuery(".menu-anchor a").click(function() {
    event.preventDefault();
    var menuItem = jQuery(this).attr('href');

    jQuery('#site-navigation').removeClass('toggled');
    jQuery('body').removeClass('menu-toggled');

    jQuery([document.documentElement, document.body]).animate({
        scrollTop: jQuery(menuItem).offset().top
    }, 500).delay(200);
});

jQuery(".check-reservation").click(function() {
    //event.preventDefault();
    jQuery("#check-reservation").prop( "checked", true );
    jQuery("#check-message").prop( "checked", false );
    jQuery('.form-field.your-reservation').addClass('active');
});

jQuery(".check-message").click(function() {
    //event.preventDefault();
    jQuery("#check-reservation").prop( "checked", false );
    jQuery("#check-message").prop( "checked", true );
    jQuery('.form-field.your-reservation').removeClass('active');
});

jQuery('#add-entry-form').submit(function(ev) {
	ev.preventDefault();

	jQuery(this).find('.form-submit .add-entry-button').css('display','none');
	jQuery(this).find('.form-submit .wait').css('display','block');

	if (jQuery('#check-message').prop('checked')) {
	    message_type = 'message';
	}
	else {
		message_type = 'reservation';
	}


	const ajaxurl = jQuery(this).attr('action');
	const data = {
		action: jQuery(this).find('input[name=action]').val(), 
    name: jQuery(this).find('input[name=name]').val(),
    email: jQuery(this).find('input[name=email]').val(),
    phone: jQuery(this).find('input[name=phone]').val(),
    message_type: message_type,
    startdate: jQuery(this).find('input[name=startdate]').val(),
    staylength: jQuery('#staylength').find(":selected").val(),
    adults: jQuery(this).find('input[name=adults]').val(),
    children: jQuery(this).find('input[name=children]').val(),
    message: jQuery(this).find('textarea[name=message]').val(),
	}

	console.log(data);

	fetch(ajaxurl, {
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded',
	        'Cache-Control': 'no-cache',
	    },
	    body: new URLSearchParams(data),
	})
	.then(response => response.json())
	.then(response => {

	    if (!response.success) {
	        alert("An error occured. Please, try again.");
	        return;
	    }
	    else {

	    	if(response.data.validate == true) {

	    		jQuery('input.form-field').each(function() {
				  	jQuery(this).val('');
				  });

	      	jQuery('.form-submit .wait').css('display','none');
	      	jQuery('#add-entry-form').remove();
	      	jQuery('#form-saved').css('display','block');

	      	jQuery([document.documentElement, document.body]).animate({
			        scrollTop: jQuery('#register').offset().top
			    }, 0).delay(0);
	    	}
	    }
	})

});