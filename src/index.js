import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Import helpers which can be called from the react components
require('./helpers/site');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();