/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function() {
	var pageBody, container, button, menu, links, i, len;

	pageBody = document.getElementsByTagName('body');
	container = document.getElementById( 'site-navigation' );

	if ( ! container ) {
		return;
	}

	button = container.getElementsByTagName( 'button' )[0];
	if ( 'undefined' === typeof button ) {
		return;
	}

	menu = container.getElementsByClassName( 'nav-inner' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	menu.setAttribute( 'aria-expanded', 'false' );
	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
			if(pageBody[0].classList.contains('menu-open')) {
				pageBody[0].classList.remove('menu-open');
			}
		//	pageBody.classList.remove(' menu-open');
			container.className = container.className.replace( ' toggled', '' );
			button.setAttribute( 'aria-expanded', 'false' );
			menu.setAttribute( 'aria-expanded', 'false' );

		} else {
			pageBody[0].classList.add('menu-open');
			container.className += ' toggled';
			button.setAttribute( 'aria-expanded', 'true' );
			menu.setAttribute( 'aria-expanded', 'true' );
		}
	};

	// Get all the link elements within the menu.
	links    = menu.getElementsByTagName( 'a' );

	// Each time a menu link is focused or blurred, toggle focus.
	for ( i = 0, len = links.length; i < len; i++ ) {
		links[i].addEventListener( 'focus', toggleFocus, true );
		links[i].addEventListener( 'blur', toggleFocus, true );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		var self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				if ( -1 !== self.className.indexOf( 'focus' ) ) {
					self.className = self.className.replace( ' focus', '' );
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}

	/**
	 * Toggles `focus` class to allow submenu access on tablets.
	 */
	( function( container ) {
		var touchStartFn, i,
			parentLink = container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

		if ( 'ontouchstart' in window ) {
			touchStartFn = function( e ) {
				var menuItem = this.parentNode, i;

				if ( ! menuItem.classList.contains( 'focus' ) ) {
					e.preventDefault();
					for ( i = 0; i < menuItem.parentNode.children.length; ++i ) {
						if ( menuItem === menuItem.parentNode.children[i] ) {
							continue;
						}
						menuItem.parentNode.children[i].classList.remove( 'focus' );
					}
					menuItem.classList.add( 'focus' );
				} else {
					menuItem.classList.remove( 'focus' );
				}
			};

			for ( i = 0; i < parentLink.length; ++i ) {
				parentLink[i].addEventListener( 'touchstart', touchStartFn, false );
			}
		}
	}( container ) );
} )();

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
/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
( function() {
	var isIe = /(trident|msie)/i.test( navigator.userAgent );

	if ( isIe && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
} )();

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS5jb29raWUuanMiLCJuYXZpZ2F0aW9uLmpzIiwic3RpY2t5LW1lbnUuanMiLCJza2lwLWxpbmstZm9jdXMtZml4LmpzIiwibWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIGpRdWVyeSBDb29raWUgUGx1Z2luIHYxLjQuMVxuICogaHR0cHM6Ly9naXRodWIuY29tL2NhcmhhcnRsL2pxdWVyeS1jb29raWVcbiAqXG4gKiBDb3B5cmlnaHQgMjAwNiwgMjAxNCBLbGF1cyBIYXJ0bFxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EIChSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlKVxuXHRcdGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblx0XHQvLyBOb2RlL0NvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcblx0fSBlbHNlIHtcblx0XHQvLyBCcm93c2VyIGdsb2JhbHNcblx0XHRmYWN0b3J5KGpRdWVyeSk7XG5cdH1cbn0oZnVuY3Rpb24gKCQpIHtcblxuXHR2YXIgcGx1c2VzID0gL1xcKy9nO1xuXG5cdGZ1bmN0aW9uIGVuY29kZShzKSB7XG5cdFx0cmV0dXJuIGNvbmZpZy5yYXcgPyBzIDogZW5jb2RlVVJJQ29tcG9uZW50KHMpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGVjb2RlKHMpIHtcblx0XHRyZXR1cm4gY29uZmlnLnJhdyA/IHMgOiBkZWNvZGVVUklDb21wb25lbnQocyk7XG5cdH1cblxuXHRmdW5jdGlvbiBzdHJpbmdpZnlDb29raWVWYWx1ZSh2YWx1ZSkge1xuXHRcdHJldHVybiBlbmNvZGUoY29uZmlnLmpzb24gPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgOiBTdHJpbmcodmFsdWUpKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHBhcnNlQ29va2llVmFsdWUocykge1xuXHRcdGlmIChzLmluZGV4T2YoJ1wiJykgPT09IDApIHtcblx0XHRcdC8vIFRoaXMgaXMgYSBxdW90ZWQgY29va2llIGFzIGFjY29yZGluZyB0byBSRkMyMDY4LCB1bmVzY2FwZS4uLlxuXHRcdFx0cyA9IHMuc2xpY2UoMSwgLTEpLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKS5yZXBsYWNlKC9cXFxcXFxcXC9nLCAnXFxcXCcpO1xuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHQvLyBSZXBsYWNlIHNlcnZlci1zaWRlIHdyaXR0ZW4gcGx1c2VzIHdpdGggc3BhY2VzLlxuXHRcdFx0Ly8gSWYgd2UgY2FuJ3QgZGVjb2RlIHRoZSBjb29raWUsIGlnbm9yZSBpdCwgaXQncyB1bnVzYWJsZS5cblx0XHRcdC8vIElmIHdlIGNhbid0IHBhcnNlIHRoZSBjb29raWUsIGlnbm9yZSBpdCwgaXQncyB1bnVzYWJsZS5cblx0XHRcdHMgPSBkZWNvZGVVUklDb21wb25lbnQocy5yZXBsYWNlKHBsdXNlcywgJyAnKSk7XG5cdFx0XHRyZXR1cm4gY29uZmlnLmpzb24gPyBKU09OLnBhcnNlKHMpIDogcztcblx0XHR9IGNhdGNoKGUpIHt9XG5cdH1cblxuXHRmdW5jdGlvbiByZWFkKHMsIGNvbnZlcnRlcikge1xuXHRcdHZhciB2YWx1ZSA9IGNvbmZpZy5yYXcgPyBzIDogcGFyc2VDb29raWVWYWx1ZShzKTtcblx0XHRyZXR1cm4gJC5pc0Z1bmN0aW9uKGNvbnZlcnRlcikgPyBjb252ZXJ0ZXIodmFsdWUpIDogdmFsdWU7XG5cdH1cblxuXHR2YXIgY29uZmlnID0gJC5jb29raWUgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuXG5cdFx0Ly8gV3JpdGVcblxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSAmJiAhJC5pc0Z1bmN0aW9uKHZhbHVlKSkge1xuXHRcdFx0b3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBjb25maWcuZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMuZXhwaXJlcyA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0dmFyIGRheXMgPSBvcHRpb25zLmV4cGlyZXMsIHQgPSBvcHRpb25zLmV4cGlyZXMgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0XHR0LnNldE1pbGxpc2Vjb25kcyh0LmdldE1pbGxpc2Vjb25kcygpICsgZGF5cyAqIDg2NGUrNSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoZG9jdW1lbnQuY29va2llID0gW1xuXHRcdFx0XHRlbmNvZGUoa2V5KSwgJz0nLCBzdHJpbmdpZnlDb29raWVWYWx1ZSh2YWx1ZSksXG5cdFx0XHRcdG9wdGlvbnMuZXhwaXJlcyA/ICc7IGV4cGlyZXM9JyArIG9wdGlvbnMuZXhwaXJlcy50b1VUQ1N0cmluZygpIDogJycsIC8vIHVzZSBleHBpcmVzIGF0dHJpYnV0ZSwgbWF4LWFnZSBpcyBub3Qgc3VwcG9ydGVkIGJ5IElFXG5cdFx0XHRcdG9wdGlvbnMucGF0aCAgICA/ICc7IHBhdGg9JyArIG9wdGlvbnMucGF0aCA6ICcnLFxuXHRcdFx0XHRvcHRpb25zLmRvbWFpbiAgPyAnOyBkb21haW49JyArIG9wdGlvbnMuZG9tYWluIDogJycsXG5cdFx0XHRcdG9wdGlvbnMuc2VjdXJlICA/ICc7IHNlY3VyZScgOiAnJ1xuXHRcdFx0XS5qb2luKCcnKSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVhZFxuXG5cdFx0dmFyIHJlc3VsdCA9IGtleSA/IHVuZGVmaW5lZCA6IHt9LFxuXHRcdFx0Ly8gVG8gcHJldmVudCB0aGUgZm9yIGxvb3AgaW4gdGhlIGZpcnN0IHBsYWNlIGFzc2lnbiBhbiBlbXB0eSBhcnJheVxuXHRcdFx0Ly8gaW4gY2FzZSB0aGVyZSBhcmUgbm8gY29va2llcyBhdCBhbGwuIEFsc28gcHJldmVudHMgb2RkIHJlc3VsdCB3aGVuXG5cdFx0XHQvLyBjYWxsaW5nICQuY29va2llKCkuXG5cdFx0XHRjb29raWVzID0gZG9jdW1lbnQuY29va2llID8gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpIDogW10sXG5cdFx0XHRpID0gMCxcblx0XHRcdGwgPSBjb29raWVzLmxlbmd0aDtcblxuXHRcdGZvciAoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHR2YXIgcGFydHMgPSBjb29raWVzW2ldLnNwbGl0KCc9JyksXG5cdFx0XHRcdG5hbWUgPSBkZWNvZGUocGFydHMuc2hpZnQoKSksXG5cdFx0XHRcdGNvb2tpZSA9IHBhcnRzLmpvaW4oJz0nKTtcblxuXHRcdFx0aWYgKGtleSA9PT0gbmFtZSkge1xuXHRcdFx0XHQvLyBJZiBzZWNvbmQgYXJndW1lbnQgKHZhbHVlKSBpcyBhIGZ1bmN0aW9uIGl0J3MgYSBjb252ZXJ0ZXIuLi5cblx0XHRcdFx0cmVzdWx0ID0gcmVhZChjb29raWUsIHZhbHVlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFByZXZlbnQgc3RvcmluZyBhIGNvb2tpZSB0aGF0IHdlIGNvdWxkbid0IGRlY29kZS5cblx0XHRcdGlmICgha2V5ICYmIChjb29raWUgPSByZWFkKGNvb2tpZSkpICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cmVzdWx0W25hbWVdID0gY29va2llO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0Y29uZmlnLmRlZmF1bHRzID0ge307XG5cblx0JC5yZW1vdmVDb29raWUgPSBmdW5jdGlvbiAoa2V5LCBvcHRpb25zKSB7XG5cdFx0Ly8gTXVzdCBub3QgYWx0ZXIgb3B0aW9ucywgdGh1cyBleHRlbmRpbmcgYSBmcmVzaCBvYmplY3QuLi5cblx0XHQkLmNvb2tpZShrZXksICcnLCAkLmV4dGVuZCh7fSwgb3B0aW9ucywgeyBleHBpcmVzOiAtMSB9KSk7XG5cdFx0cmV0dXJuICEkLmNvb2tpZShrZXkpO1xuXHR9O1xuXG59KSk7XG4iLCIvKipcclxuICogRmlsZSBuYXZpZ2F0aW9uLmpzLlxyXG4gKlxyXG4gKiBIYW5kbGVzIHRvZ2dsaW5nIHRoZSBuYXZpZ2F0aW9uIG1lbnUgZm9yIHNtYWxsIHNjcmVlbnMgYW5kIGVuYWJsZXMgVEFCIGtleVxyXG4gKiBuYXZpZ2F0aW9uIHN1cHBvcnQgZm9yIGRyb3Bkb3duIG1lbnVzLlxyXG4gKi9cclxuKCBmdW5jdGlvbigpIHtcclxuXHR2YXIgcGFnZUJvZHksIGNvbnRhaW5lciwgYnV0dG9uLCBtZW51LCBsaW5rcywgaSwgbGVuO1xyXG5cclxuXHRwYWdlQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5Jyk7XHJcblx0Y29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdzaXRlLW5hdmlnYXRpb24nICk7XHJcblxyXG5cdGlmICggISBjb250YWluZXIgKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRidXR0b24gPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoICdidXR0b24nIClbMF07XHJcblx0aWYgKCAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIGJ1dHRvbiApIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdG1lbnUgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggJ25hdi1pbm5lcicgKVswXTtcclxuXHJcblx0Ly8gSGlkZSBtZW51IHRvZ2dsZSBidXR0b24gaWYgbWVudSBpcyBlbXB0eSBhbmQgcmV0dXJuIGVhcmx5LlxyXG5cdGlmICggJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiBtZW51ICkge1xyXG5cdFx0YnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRtZW51LnNldEF0dHJpYnV0ZSggJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnICk7XHJcblx0aWYgKCAtMSA9PT0gbWVudS5jbGFzc05hbWUuaW5kZXhPZiggJ25hdi1tZW51JyApICkge1xyXG5cdFx0bWVudS5jbGFzc05hbWUgKz0gJyBuYXYtbWVudSc7XHJcblx0fVxyXG5cclxuXHRidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKCAtMSAhPT0gY29udGFpbmVyLmNsYXNzTmFtZS5pbmRleE9mKCAndG9nZ2xlZCcgKSApIHtcclxuXHRcdFx0aWYocGFnZUJvZHlbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LW9wZW4nKSkge1xyXG5cdFx0XHRcdHBhZ2VCb2R5WzBdLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnUtb3BlbicpO1xyXG5cdFx0XHR9XHJcblx0XHQvL1x0cGFnZUJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnIG1lbnUtb3BlbicpO1xyXG5cdFx0XHRjb250YWluZXIuY2xhc3NOYW1lID0gY29udGFpbmVyLmNsYXNzTmFtZS5yZXBsYWNlKCAnIHRvZ2dsZWQnLCAnJyApO1xyXG5cdFx0XHRidXR0b24uc2V0QXR0cmlidXRlKCAnYXJpYS1leHBhbmRlZCcsICdmYWxzZScgKTtcclxuXHRcdFx0bWVudS5zZXRBdHRyaWJ1dGUoICdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyApO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBhZ2VCb2R5WzBdLmNsYXNzTGlzdC5hZGQoJ21lbnUtb3BlbicpO1xyXG5cdFx0XHRjb250YWluZXIuY2xhc3NOYW1lICs9ICcgdG9nZ2xlZCc7XHJcblx0XHRcdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoICdhcmlhLWV4cGFuZGVkJywgJ3RydWUnICk7XHJcblx0XHRcdG1lbnUuc2V0QXR0cmlidXRlKCAnYXJpYS1leHBhbmRlZCcsICd0cnVlJyApO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8vIEdldCBhbGwgdGhlIGxpbmsgZWxlbWVudHMgd2l0aGluIHRoZSBtZW51LlxyXG5cdGxpbmtzICAgID0gbWVudS5nZXRFbGVtZW50c0J5VGFnTmFtZSggJ2EnICk7XHJcblxyXG5cdC8vIEVhY2ggdGltZSBhIG1lbnUgbGluayBpcyBmb2N1c2VkIG9yIGJsdXJyZWQsIHRvZ2dsZSBmb2N1cy5cclxuXHRmb3IgKCBpID0gMCwgbGVuID0gbGlua3MubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XHJcblx0XHRsaW5rc1tpXS5hZGRFdmVudExpc3RlbmVyKCAnZm9jdXMnLCB0b2dnbGVGb2N1cywgdHJ1ZSApO1xyXG5cdFx0bGlua3NbaV0uYWRkRXZlbnRMaXN0ZW5lciggJ2JsdXInLCB0b2dnbGVGb2N1cywgdHJ1ZSApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBvciByZW1vdmVzIC5mb2N1cyBjbGFzcyBvbiBhbiBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHRvZ2dsZUZvY3VzKCkge1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdC8vIE1vdmUgdXAgdGhyb3VnaCB0aGUgYW5jZXN0b3JzIG9mIHRoZSBjdXJyZW50IGxpbmsgdW50aWwgd2UgaGl0IC5uYXYtbWVudS5cclxuXHRcdHdoaWxlICggLTEgPT09IHNlbGYuY2xhc3NOYW1lLmluZGV4T2YoICduYXYtbWVudScgKSApIHtcclxuXHJcblx0XHRcdC8vIE9uIGxpIGVsZW1lbnRzIHRvZ2dsZSB0aGUgY2xhc3MgLmZvY3VzLlxyXG5cdFx0XHRpZiAoICdsaScgPT09IHNlbGYudGFnTmFtZS50b0xvd2VyQ2FzZSgpICkge1xyXG5cdFx0XHRcdGlmICggLTEgIT09IHNlbGYuY2xhc3NOYW1lLmluZGV4T2YoICdmb2N1cycgKSApIHtcclxuXHRcdFx0XHRcdHNlbGYuY2xhc3NOYW1lID0gc2VsZi5jbGFzc05hbWUucmVwbGFjZSggJyBmb2N1cycsICcnICk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHNlbGYuY2xhc3NOYW1lICs9ICcgZm9jdXMnO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VsZiA9IHNlbGYucGFyZW50RWxlbWVudDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZXMgYGZvY3VzYCBjbGFzcyB0byBhbGxvdyBzdWJtZW51IGFjY2VzcyBvbiB0YWJsZXRzLlxyXG5cdCAqL1xyXG5cdCggZnVuY3Rpb24oIGNvbnRhaW5lciApIHtcclxuXHRcdHZhciB0b3VjaFN0YXJ0Rm4sIGksXHJcblx0XHRcdHBhcmVudExpbmsgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCggJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuID4gYSwgLnBhZ2VfaXRlbV9oYXNfY2hpbGRyZW4gPiBhJyApO1xyXG5cclxuXHRcdGlmICggJ29udG91Y2hzdGFydCcgaW4gd2luZG93ICkge1xyXG5cdFx0XHR0b3VjaFN0YXJ0Rm4gPSBmdW5jdGlvbiggZSApIHtcclxuXHRcdFx0XHR2YXIgbWVudUl0ZW0gPSB0aGlzLnBhcmVudE5vZGUsIGk7XHJcblxyXG5cdFx0XHRcdGlmICggISBtZW51SXRlbS5jbGFzc0xpc3QuY29udGFpbnMoICdmb2N1cycgKSApIHtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgbWVudUl0ZW0ucGFyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraSApIHtcclxuXHRcdFx0XHRcdFx0aWYgKCBtZW51SXRlbSA9PT0gbWVudUl0ZW0ucGFyZW50Tm9kZS5jaGlsZHJlbltpXSApIHtcclxuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRtZW51SXRlbS5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoICdmb2N1cycgKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdG1lbnVJdGVtLmNsYXNzTGlzdC5hZGQoICdmb2N1cycgKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bWVudUl0ZW0uY2xhc3NMaXN0LnJlbW92ZSggJ2ZvY3VzJyApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGZvciAoIGkgPSAwOyBpIDwgcGFyZW50TGluay5sZW5ndGg7ICsraSApIHtcclxuXHRcdFx0XHRwYXJlbnRMaW5rW2ldLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0JywgdG91Y2hTdGFydEZuLCBmYWxzZSApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSggY29udGFpbmVyICkgKTtcclxufSApKCk7XHJcbiIsIi8qIHN0aWNreSBNZW51XG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgkKSB7XG4gIC8vaWYgKCQod2luZG93KS53aWR0aCgpID49IDk5Mikge1xuXG4gICAgLy8gaW5pdCBzdGlja3kgbWVudVxuICAgIHZhciBsYXN0U2Nyb2xsUG9zaXRpb24gPSAwO1xuICAgIGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAvLyQoXCJib2R5XCIpLmFkZENsYXNzKFwiaGFzLXN0aWNreS1tZW51XCIpO1xuXG4gICAgaWYgKGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA+IDEyMCkge1xuICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJzdGlja3ktbWVudVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJzdGlja3ktbWVudVwiKTtcbiAgICB9XG4gICAgbGFzdFNjcm9sbFBvc2l0aW9uID0gY3VycmVudFNjcm9sbFBvc2l0aW9uO1xuXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG4gICAgICBjdXJyZW50U2Nyb2xsUG9zaXRpb24gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICBpZiAoY3VycmVudFNjcm9sbFBvc2l0aW9uID4gMTIwKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwic3RpY2t5LW1lbnVcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcInN0aWNreS1tZW51XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA+IGxhc3RTY3JvbGxQb3NpdGlvbikge1xuICAgICAgICBqUXVlcnkoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2Nyb2xsLXVwXCIpO1xuICAgICAgICBqUXVlcnkoXCJib2R5XCIpLmFkZENsYXNzKFwic2Nyb2xsLWRvd25cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBqUXVlcnkoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2Nyb2xsLWRvd25cIik7XG4gICAgICAgIGpRdWVyeShcImJvZHlcIikuYWRkQ2xhc3MoXCJzY3JvbGwtdXBcIik7XG4gICAgICB9XG4gICAgICBsYXN0U2Nyb2xsUG9zaXRpb24gPSBjdXJyZW50U2Nyb2xsUG9zaXRpb247XG4gICAgfSk7XG4gIC8vfVxuICBcbiAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgKlxuICAqIEV4dHJhLWNvbmYgZm9yIG9uZXBhZ2VzXG4gICpcbiAgKiAqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLyogIGpRdWVyeShcIi5tZW51LWl0ZW0gYVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgbWVudUl0ZW0gPSBqUXVlcnkodGhpcykuYXR0cignaHJlZicpO1xuXG4gICAgICBqUXVlcnkoJy5tYWluLW5hdmlnYXRpb24nKS5yZW1vdmVDbGFzcygndG9nZ2xlZCcpO1xuICAgICAgalF1ZXJ5KCdib2R5JykucmVtb3ZlQ2xhc3MoJ21lbnUtdG9nZ2xlZCcpO1xuXG4gICAgICBqUXVlcnkoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0pLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogalF1ZXJ5KG1lbnVJdGVtKS5vZmZzZXQoKS50b3AtMTAwXG4gICAgICB9LCA4MDApLmRlbGF5KDIwMCk7XG4gIH0pOyovXG59KTsiLCIvKipcclxuICogRmlsZSBza2lwLWxpbmstZm9jdXMtZml4LmpzLlxyXG4gKlxyXG4gKiBIZWxwcyB3aXRoIGFjY2Vzc2liaWxpdHkgZm9yIGtleWJvYXJkIG9ubHkgdXNlcnMuXHJcbiAqXHJcbiAqIExlYXJuIG1vcmU6IGh0dHBzOi8vZ2l0LmlvL3ZXZHIyXHJcbiAqL1xyXG4oIGZ1bmN0aW9uKCkge1xyXG5cdHZhciBpc0llID0gLyh0cmlkZW50fG1zaWUpL2kudGVzdCggbmF2aWdhdG9yLnVzZXJBZ2VudCApO1xyXG5cclxuXHRpZiAoIGlzSWUgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgKSB7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGlkID0gbG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoIDEgKSxcclxuXHRcdFx0XHRlbGVtZW50O1xyXG5cclxuXHRcdFx0aWYgKCAhICggL15bQS16MC05Xy1dKyQvLnRlc3QoIGlkICkgKSApIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggaWQgKTtcclxuXHJcblx0XHRcdGlmICggZWxlbWVudCApIHtcclxuXHRcdFx0XHRpZiAoICEgKCAvXig/OmF8c2VsZWN0fGlucHV0fGJ1dHRvbnx0ZXh0YXJlYSkkL2kudGVzdCggZWxlbWVudC50YWdOYW1lICkgKSApIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQudGFiSW5kZXggPSAtMTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVsZW1lbnQuZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgZmFsc2UgKTtcclxuXHR9XHJcbn0gKSgpO1xyXG4iLCJqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgkKSB7XHJcblxyXG4gIC8vIGpRdWVyeShcIi5zbGlkZXItaGVyb1wiKS5vd2xDYXJvdXNlbCh7XHJcbiAgLy8gICBsb29wOiB0cnVlLFxyXG4gIC8vICAgbmF2OiB0cnVlLFxyXG4gIC8vICAgZG90czogZmFsc2UsXHJcbiAgLy8gICBhdXRvcGxheTogdHJ1ZSxcclxuICAvLyAgIG1vdXNlRHJhZzogdHJ1ZSxcclxuICAvLyAgIHRvdWNoRHJhZzogdHJ1ZSxcclxuICAvLyAgIGl0ZW1zOiAxLFxyXG4gIC8vIH0pO1xyXG5cclxuXHQvKmpRdWVyeShcIi5zbGlkZXItYWN0aXZpdGllc1wiKS5vd2xDYXJvdXNlbCh7XHJcblx0XHRsb29wOiBmYWxzZSxcclxuXHRcdG5hdjogdHJ1ZSxcclxuXHRcdGRvdHM6IGZhbHNlLFxyXG5cdFx0YXV0b3BsYXk6IGZhbHNlLFxyXG5cdFx0bW91c2VEcmFnOiB0cnVlLFxyXG5cdFx0dG91Y2hEcmFnOiB0cnVlLFxyXG5cdFx0cmVzcG9uc2l2ZSA6IHtcclxuXHRcdCAgICAwIDoge1xyXG5cdFx0ICAgICAgICBpdGVtczogMSxcclxuXHRcdCAgICB9LFxyXG5cdFx0ICAgIDc2OCA6IHtcclxuXHRcdCAgICAgICAgaXRlbXM6IDIsXHJcblx0XHQgICAgfSxcclxuXHRcdCAgICA5OTIgOiB7XHJcblx0XHQgICAgICAgIGl0ZW1zOiAzLFxyXG5cdFx0ICAgIH0sXHJcblx0XHQgICAgIDEyMDAgOiB7XHJcblx0XHQgICAgXHRpdGVtczogNCxcclxuXHRcdCAgICB9XHJcblx0XHR9XHJcblx0fSk7Ki9cclxuXHJcblx0aWYgKGxvY2F0aW9uLmhhc2gpIGxvY2F0aW9uLmhyZWYgPSBsb2NhdGlvbi5oYXNoO1xyXG5cclxuXHRpZiAoalF1ZXJ5LmNvb2tpZSgnaGlkZWNvb2tpZScpICE9IFwiaGlkZGVuXCIgKSB7XHJcblx0XHQkKCcjY29va2llYmFubmVyJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG5cdH1cclxuXHJcblx0aWYgKGpRdWVyeS5jb29raWUoJ2hpZGVwb3B1cCcpICE9IFwiaGlkZGVuXCIgKSB7XHJcblx0XHQkKCcjcG9wdXAnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcblx0fVxyXG5cdFxyXG5cdCQoJyNjb29raWViYW5uZXIgYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkrKDM2MCoyNCo2MCo2MCoxMDAwKSk7XHJcbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IFwiaGlkZWNvb2tpZVwiICsgXCI9XCIgKyBcImhpZGRlblwiICsgXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCk7XHJcblxyXG4gICAgICAkKCcjY29va2llYmFubmVyJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG5cdH0pO1xyXG5cdFxyXG5cclxufSlcclxuXHJcbmpRdWVyeShcIi5tZW51LWFuY2hvciBhXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBtZW51SXRlbSA9IGpRdWVyeSh0aGlzKS5hdHRyKCdocmVmJyk7XHJcblxyXG4gICAgalF1ZXJ5KCcjc2l0ZS1uYXZpZ2F0aW9uJykucmVtb3ZlQ2xhc3MoJ3RvZ2dsZWQnKTtcclxuICAgIGpRdWVyeSgnYm9keScpLnJlbW92ZUNsYXNzKCdtZW51LXRvZ2dsZWQnKTtcclxuXHJcbiAgICBqUXVlcnkoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0pLmFuaW1hdGUoe1xyXG4gICAgICAgIHNjcm9sbFRvcDogalF1ZXJ5KG1lbnVJdGVtKS5vZmZzZXQoKS50b3BcclxuICAgIH0sIDUwMCkuZGVsYXkoMjAwKTtcclxufSk7XHJcblxyXG5qUXVlcnkoXCIuY2hlY2stcmVzZXJ2YXRpb25cIikuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgalF1ZXJ5KFwiI2NoZWNrLXJlc2VydmF0aW9uXCIpLnByb3AoIFwiY2hlY2tlZFwiLCB0cnVlICk7XHJcbiAgICBqUXVlcnkoXCIjY2hlY2stbWVzc2FnZVwiKS5wcm9wKCBcImNoZWNrZWRcIiwgZmFsc2UgKTtcclxuICAgIGpRdWVyeSgnLmZvcm0tZmllbGQueW91ci1yZXNlcnZhdGlvbicpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxufSk7XHJcblxyXG5qUXVlcnkoXCIuY2hlY2stbWVzc2FnZVwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBqUXVlcnkoXCIjY2hlY2stcmVzZXJ2YXRpb25cIikucHJvcCggXCJjaGVja2VkXCIsIGZhbHNlICk7XHJcbiAgICBqUXVlcnkoXCIjY2hlY2stbWVzc2FnZVwiKS5wcm9wKCBcImNoZWNrZWRcIiwgdHJ1ZSApO1xyXG4gICAgalF1ZXJ5KCcuZm9ybS1maWVsZC55b3VyLXJlc2VydmF0aW9uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG59KTsiXX0=
