// CSS
require('../css/site.scss');

// JavaScript
window.jQuery = window.$ = require('jquery');
//import $ from 'jquery';
//import 'popper.js';
//import 'bootstrap';
//import 'bootstrap/js/dist/util';
//import 'bootstrap/js/dist/dropdown';

require('./scrollPosStyler.js');
require('./main.js');

// Wait for the DOM to load before trying to import react elements
//document.addEventListener('DOMContentLoaded', () => {
  require('./projects-react');
//});

// Google Map API Key: AIzaSyCndjunRNFKCSAhaWy-_bUQ2g4NcFJUEHE