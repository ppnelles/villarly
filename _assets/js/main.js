jQuery(document).ready(function ($) {

  jQuery(".slider-hero").owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    items: 1,
  });

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
	
	jQuery(".popup-close, .popup-bg").click(function(event) {
      var date = new Date();
      date.setTime(date.getTime()+(60*60*1000));
      document.cookie = "hidepopup" + "=" + "hidden" + "; expires=" + date.toGMTString();
	  
	  jQuery('#popup').addClass('hidden');
	});

})

var slideIndex = 1;

jQuery(".open-modal-gallery, .modal-content .prev, .modal-content .next").click(function(event) {
	var slideID = jQuery(this).data('slide');
	//console.log(slideID);
	jQuery(this).parents('.photogallery').find('.modal-gallery').css("display", "block");
	showSlides(slideID, this);
});

jQuery('.close-modal-cursor').click(function(event) {
  jQuery(".modal-gallery").css("display", "none");
});

// function plusSlides(n) {
//   showSlides(slideIndex += n, this);
// }

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

/*jQuery('.modal-content .prev').click(function(event) {
	//slideIndex = slideIndex - 1;
	console.log(slideIndex);
  	showSlides(slideIndex, this);
});
*/
function showSlides(n, current) {
 // var i;
  var slides = jQuery(current).parents('.photogallery').find('.mySlides');
  //var dots = document.getElementsByClassName("demo");
  //var captionText = document.getElementById("caption");
  //console.log(slides.length);
  slidePrev = n - 1;
  slideNext = n + 1;
  
  if (slideNext > slides.length) { 
  	slideNext = slides.length;
  	jQuery(current).parents('.photogallery').find('.next').css("display", "none");
  }
  else {
  	jQuery(current).parents('.photogallery').find('.next').css("display", "block");
  }
  
  if (slidePrev < 1) { 
  	slidePrev = 1;
  	jQuery(current).parents('.photogallery').find('.prev').css("display", "none");
  }
  else {
  	jQuery(current).parents('.photogallery').find('.prev').css("display", "block");
  }

  	console.log(slidePrev);
  	console.log(slideNext);

  jQuery(current).parents('.photogallery').find('.prev').data('slide', slidePrev);
  jQuery(current).parents('.photogallery').find('.next').data('slide', slideNext);
  /*for (i = 0; i < slides.length; i++) {
  &  slides[i].style.display = "none";
  }*/
  // for (i = 0; i < dots.length; i++) {
  //   dots[i].className = dots[i].className.replace(" active", "");
  // }
  //slides[slideIndex-1].style.display = "block";
  //dots[slideIndex-1].className += " active";
  //captionText.innerHTML = dots[slideIndex-1].alt;

  jQuery(slides).each(function() {
  	if(jQuery(this).data('slide') != n) {
  		jQuery(this).css("display", "none");
  	}
  	else {
  		jQuery(this).css("display", "block");
  	}
  });
}

/* ***********
*
* Gallery modal
*
*************** */



// Open the Modal
// function openModal(e) {
// console.log(jQuery(this).parent());
//   jQuery(this).css("display", "block");
// }

// // Close the Modal
// 

//showSlides(slideIndex);

// Next/previous controls