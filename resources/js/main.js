/*$(document).ready(function(){

  // Set Scrollspy
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
      
      $('body').css("margin-top", $('#main-nav').height());
      
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
  
  // Smooth Scroll To Hash Link
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


  // Enable Tooltips Everywhere
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });
  
  
  
  // Throttle scrolling
  //
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
  }, 250);
  
  
  
});*/


window.initMap = () => {
  const lonlat = { lat: 42.666398, lng: -71.588338 };
  const mapCenter = {lat: 42.409486, lng: -71.208822};
  const styles = require('./map-style.json');
  
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: mapCenter,
    styles: styles
  });
    
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