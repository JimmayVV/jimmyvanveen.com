let _ = require('lodash');

let changeNav = () => {
  // Check to see if the nav classes should change
};

window.addEventListener('scroll', _.throttle(changeNav, 1000));

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