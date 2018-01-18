let _ = require('lodash');

let navChange = document.getElementById('nav-change');
let mainNav = document.getElementById('main-nav');

// Get all of the anchorLinks that link to id tags (in the nav)
let anchorLinks = document.querySelectorAll('a[href^="#"]');

// Call each function we are using within the scroll event listener
let changeNav = () => {
  setActiveNav();
  setNavBg();
};

// setActiveNav will detect where on the page the scroll is, and set the correct link to be 'active'
let setActiveNav = () => {
  let match;

  // Set the nav underlines if we are in a specific section
  anchorLinks.forEach((link) => {
    // Remove any 'active' classes on the link (we will add it back later if necessary)
    link.classList.remove('active');
    // Get the element targetted by the link
    let target = document.querySelector(link.getAttribute('href'));
    // If no target was found, return out of this call
    if (!target) return;

    // Calculate the heights and position of the current scroll to determine if we are at the bottom or not
    let totalHeight, currentScroll, visibleHeight, body = document.body, html = document.documentElement;
  
    currentScroll = (document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
    totalHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    visibleHeight = document.documentElement.clientHeight;

    if (target.getBoundingClientRect().top <= 2 || (totalHeight <= (currentScroll + visibleHeight))) {
      match = link;
    }
  });

  // Whichever element was selected to be active will now be made active
  if (match) match.classList.add('active');
};

// Change the nav bg based on if the page has scrolled past the heading jumbotron
let setNavBg = () => {
  let wrapperPos = navChange.getBoundingClientRect().top;

  let darkNav = ['navbar-dark'];
  let lightNav = ['navbar-light', 'bg-semi'];

  let offset = mainNav.offsetHeight;

  if (wrapperPos <= (0 + offset)) {
    mainNav.classList.remove(...darkNav);
    mainNav.classList.add(...lightNav);
  } else {
    mainNav.classList.remove(...lightNav);
    mainNav.classList.add(...darkNav);
  }
};

// Smooth scroll event listener - this will scroll the page to the selected element smoothly
let smoothScroll = event => {
  // Prevent the event from happening
  event.preventDefault();
  // Get, and store, the targetId of the clicked link
  let targetId = event.target.getAttribute('href');
  // Get the target element, and check if it exists before continuing
  let target = document.querySelector(targetId);
  if (!target) return;
  // Polyfill to process the smooth scroll:
  const distanceToTop = elem => Math.floor(elem.getBoundingClientRect().top);
  const originalTop = distanceToTop(target);
  window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
};

// Add event listener on the scroll event, and apply the changeNav function to it to set the 'active' link
window.addEventListener('scroll', _.throttle(changeNav, 125, {leading: true, trailing: true}));

// Impliment smooth scrolling on each of the links
anchorLinks.forEach(link => link.addEventListener('click', link => smoothScroll(link)));

// Get the Google Map working
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