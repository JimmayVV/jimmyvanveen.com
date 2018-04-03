import React, { Component } from 'react';

export default class GoogleMap extends Component {

  componentDidMount() {
    // Set the API key for Google Maps as prescribed by the Google Maps API documentation
    let apiKey = this.props.apiKey || 'AIzaSyCndjunRNFKCSAhaWy-_bUQ2g4NcFJUEHE';

    // Thank you stack overflow:
    // https://stackoverflow.com/questions/14521108/dynamically-load-js-inside-js
    // https://stackoverflow.com/questions/16230886/trying-to-fire-the-onload-event-on-script-tag/16231055#16231055

    // Set the src of the api call
    let src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    // Create the script tag
    let el = document.createElement('script');
    // If we wanted to utilize the effects of the script, we would provide an onload function to interact with it prior to setting src
    // el.onload = () => {} // Then...
    el.src = src;
    
    // Set the map callback as defined in this helper function
    this.mapSettings();
    // Append the script so that it loads
    document.body.appendChild(el);
  }

  mapSettings() {
    // Get the Google Map working
    window.initMap = () => {
      const lonlat = { lat: 42.666398, lng: -71.588338 };
      const mapCenter = { lat: 42.409486, lng: -71.208822 };
      const styles = require('./map-style.json');
      const google = window.google;

      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: mapCenter,
        styles: styles
      });

      // eslint-disable-next-line
      var marker = new google.maps.Marker({
        position: lonlat,
        map: map,
        icon: {
          url: 'https://s3.amazonaws.com/jimmyvanveen-bucket/map-marker.svg',
          anchor: new google.maps.Point(18, 50),
          scaledSize: new google.maps.Size(40, 50),
          zIndex: -20
        }
      });
    }
  }

  render() {
    return (
      <div id="map" className="col">Map</div>
    );
  }
}