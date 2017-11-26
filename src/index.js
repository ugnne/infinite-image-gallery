import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

WebFont.load({
  google: {
    families: [ 'Roboto:100i,300,400,400i,700', 'sans-serif']
  }
});

