jQuery( document ).ready(function( $ ) {

    "use strict";

    // Function for handling tabs (if used, ensure #tabs exists or add checks)
    // Consider adding a check: if ($("#tabs").length) { $("#tabs").tabs(); }
    $(function() {
        // Check if the #tabs element exists before initializing tabs
        if ($("#tabs").length) {
            $( "#tabs" ).tabs();
        }
    });


    // Page loading animation
    // Ensure #preloader exists
    if ($("#preloader").length) {
        $("#preloader").animate({
            'opacity': '0'
        }, 600, function(){
            setTimeout(function(){
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });
    }


    // Header background change on scroll
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      // Check if .header-text exists before getting its height
      var boxHeight = $('.header-text').length ? $('.header-text').height() : 0;
      var headerHeight = $('header').length ? $('header').height() : 0;

      // Ensure both elements exist before comparing heights
      if (boxHeight > 0 && headerHeight > 0 && scroll >= boxHeight - headerHeight) {
        $("header").addClass("background-header");
      } else {
        $("header").removeClass("background-header");
      }
    });

    // Owl Carousel for Testimonials
    if ($('.owl-testimonials').length) {
        $('.owl-testimonials').owlCarousel({
            loop: true,
            nav: false,
            dots: true,
            items: 1,
            margin: 30,
            autoplay: false, // Set to true if you want autoplay
            smartSpeed: 700,
            autoplayTimeout: 6000,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                460: {
                    items: 1,
                    margin: 0
                },
                576: {
                    items: 1, // Adjusted for better display on small screens
                    margin: 20
                },
                992: {
                    items: 2,
                    margin: 30
                }
            }
        });
    }

    // Owl Carousel for Partners (if used)
    if ($('.owl-partners').length) {
        $('.owl-partners').owlCarousel({
            loop: true,
            nav: false,
            dots: true,
            items: 1,
            margin: 30,
            autoplay: false, // Set to true if you want autoplay
            smartSpeed: 700,
            autoplayTimeout: 6000,
            responsive: {
                0: {
                    items: 2, // Show more items on smaller screens if desired
                    margin: 15
                },
                460: {
                    items: 2,
                    margin: 20
                },
                576: {
                    items: 3,
                    margin: 20
                },
                992: {
                    items: 4,
                    margin: 30
                }
            }
        });
    }

    // Slick Slider for Main Banner
    if ($(".Modern-Slider").length) {
        $(".Modern-Slider").slick({
            autoplay:true,
            autoplaySpeed:10000,
            speed:600,
            slidesToShow:1,
            slidesToScroll:1,
            pauseOnHover:false,
            dots:true,
            pauseOnDotsHover:true,
            cssEase:'linear',
           // fade:true, // Uncomment if you prefer fade effect
            draggable:false,
            prevArrow:'<button class="PrevArrow"></button>',
            nextArrow:'<button class="NextArrow"></button>',
        });
    }

    // Function to check if an element is visible in the viewport
    function visible(element) {
        // Check if the element exists and is visible before getting offset
        if (!element || element.length === 0 || !element.is(':visible')) {
            return false; // Return false if element doesn't exist or isn't visible
        }
        var $w = jQuery(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = element.offset().top, // Now safe to call offset()
            _bottom = _top + element.height();

        // Check if element is partially or fully in view
        // Using simpler logic: return true if any part of the element overlaps with the viewport
        return (_top <= viewBottom) && (_bottom >= viewTop);
    }


    // Counter animation on scroll
    $(window).scroll(function(){
      var $countDigits = $('.count-digit'); // Select the elements

      // *** FIX: Check if elements exist before proceeding ***
      if ($countDigits.length > 0 && visible($countDigits)) {
          // Check if animation already ran
          if ($countDigits.first().hasClass('counter-loaded')) return; // Check only one element for the class

          $countDigits.addClass('counter-loaded'); // Add class to all

          $countDigits.each(function () {
              var $this = $(this);
              var target = parseInt($this.text().replace(/,/g, ''), 10); // Ensure text is treated as number

              // Make sure target is a valid number
              if (isNaN(target)) {
                  console.warn("Invalid number found in .count-digit:", $this.text());
                  return; // Skip this element if text is not a number
              }

              jQuery({ Counter: 0 }).animate({ Counter: target }, {
                  duration: 3000,
                  easing: 'swing',
                  step: function () {
                      // Format with commas if needed (optional)
                      $this.text(Math.ceil(this.Counter).toLocaleString());
                  },
                  complete: function() {
                      // Ensure the final value is exact and formatted
                      $this.text(target.toLocaleString());
                  }
              });
          });
      }
    });

});