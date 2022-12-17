import React from 'react';
import ReactDOM from 'react-dom/client'; //react version 18
import './index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </CookiesProvider>
);

reportWebVitals();