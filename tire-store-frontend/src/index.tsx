import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importa stilurile globale
import App from './App'; // Importa componenta App
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
