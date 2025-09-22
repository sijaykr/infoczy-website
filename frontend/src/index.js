// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async'; // <-- 1. इसे इम्पोर्ट करें

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <HelmetProvider> {/* <-- 2. App को इससे रैप करें */}
      <App />
       </HelmetProvider>
  </React.StrictMode>
);