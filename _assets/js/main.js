jQuery(document).ready(function ($) {

  // jQuery(".slider-hero").owlCarousel({
  //   loop: true,
  //   nav: true,
  //   dots: false,
  //   autoplay: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   items: 1,
  // });

	/*jQuery(".slider-activities").owlCarousel({
		loop: false,
		nav: true,
		dots: false,
		autoplay: false,
		mouseDrag: true,
		touchDrag: true,
		responsive : {
		    0 : {
		        items: 1,
		    },
		    768 : {
		        items: 2,
		    },
		    992 : {
		        items: 3,
		    },
		     1200 : {
		    	items: 4,
		    }
		}
	});*/

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
    event.preventDefault();
    jQuery("#check-reservation").prop( "checked", true );
    jQuery("#check-message").prop( "checked", false );
    jQuery('.form-field.your-reservation').addClass('active');
});

jQuery(".check-message").click(function() {
    event.preventDefault();
    jQuery("#check-reservation").prop( "checked", false );
    jQuery("#check-message").prop( "checked", true );
    jQuery('.form-field.your-reservation').removeClass('active');
});