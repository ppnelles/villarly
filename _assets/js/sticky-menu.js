/* sticky Menu
   ========================================================================== */

jQuery(document).ready(function ($) {
  //if ($(window).width() >= 992) {

    // init sticky menu
    var lastScrollPosition = 0;
    currentScrollPosition = $(window).scrollTop();
    //$("body").addClass("has-sticky-menu");

    if (currentScrollPosition > 120) {
      $("body").addClass("sticky-menu");
    } else {
      $("body").removeClass("sticky-menu");
    }
    lastScrollPosition = currentScrollPosition;

    $(window).scroll(function () {
      currentScrollPosition = $(window).scrollTop();
      if (currentScrollPosition > 120) {
        $("body").addClass("sticky-menu");
      } else {
        $("body").removeClass("sticky-menu");
      }
      if (currentScrollPosition > lastScrollPosition) {
        jQuery("body").removeClass("scroll-up");
        jQuery("body").addClass("scroll-down");
      } else {
        jQuery("body").removeClass("scroll-down");
        jQuery("body").addClass("scroll-up");
      }
      lastScrollPosition = currentScrollPosition;
    });
  //}
  
  /* **************************
  *
  * Extra-conf for onepages
  *
  * ************************** */
/*  jQuery(".menu-item a").click(function() {
      event.preventDefault();
      var menuItem = jQuery(this).attr('href');

      jQuery('.main-navigation').removeClass('toggled');
      jQuery('body').removeClass('menu-toggled');

      jQuery([document.documentElement, document.body]).animate({
          scrollTop: jQuery(menuItem).offset().top-100
      }, 800).delay(200);
  });*/
});