$(document).ready(function(){

  /* Set Scrollspy */
  $('body').scrollspy({
    target: '#main-nav',
    offset: 52
  });
  
  
  // Set nav transition when reaching the wrapper
  var nav = document.getElementById('main-nav');
  var docTop = document.querySelector('body');
  
  // Detect if #projects is at the top of the page, if so, display the 2nd nav & the #top elem
  var distance = $('.wrapper').first().offset().top,
      $window = $(window);
  
  $window.scroll(function() {
    //var fixed = 'navbar navbar-expand-md fixed-top navbar-light bg-light';
    var fixed = 'navbar navbar-expand-md fixed-top navbar-light bg-semi';
    var defaultNav = 'navbar navbar-expand-md navbar-dark';
    
    if ( $window.scrollTop() >= distance ) {
      // Change nav-bar to be fixed, and also change the color from light to dark
      nav.className = '';
      nav.className = fixed;
      
      $('body').css("margin-top", $('#main-nav').height() + 4);
      
      // Add padding to the top of the page to account for the nav being removed from the flow
      //docTop.className = 'nav-padding'
    } else {
      // Make nav invisible
      nav.className = '';
      nav.className = defaultNav;
      
      $('body').css("margin-top", 0);
      
      // Remove padding to the top of the page to account for the nav being added the flow
      //docTop.className = '';
    }
  });
  
  /* Smooth Scroll To Hash Link */
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: (target.offset().top - 40)
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          });
        }
      }
    }
  );
  
  
  
  /* Throttle scrolling */
  /*
  var didScroll = false;
  
  $(window).scroll(function() {
    didScroll = true;
  });
  
  setInterval(function() {
    if ( didScroll ) {
      didScroll = false;
      // Check your page position and then
      // Load in more results
    }
  }, 250);*/
  
  
  
});


window.initMap = function initMap() {
  var lonlat = { lat: 42.666398, lng: -71.588338 };
  var mapCenter = {lat: 42.409486, lng: -71.208822};
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: mapCenter,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e8287a"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
  });

  /*var img = new google.maps.MarkerImage(
    'https://s3.amazonaws.com/jimmyvanveen-bucket/map-marker.svg',
    new google.maps.Size(20,26),
    new google.maps.Point(0,0),
    new google.maps.Point(10,26)
  );*/

    
  var marker = new google.maps.Marker({
    position: lonlat,
    map: map,
    icon: {
      url: 'https://s3.amazonaws.com/jimmyvanveen-bucket/map-marker.svg',
      anchor: new google.maps.Point(18,50),
      scaledSize: new google.maps.Size(40,50),
      zIndex: -20
    }
  });

}