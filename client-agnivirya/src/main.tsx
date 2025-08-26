import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Extend Window interface for SSR properties
declare global {
  interface Window {
    __SSR_ENABLED__?: boolean;
    __INITIAL_STATE__?: any;
  }
}

// Check if we're in SSR mode
const isSSR = window.__SSR_ENABLED__ || false;
const initialState = window.__INITIAL_STATE__ || {};

// Get the root element
const rootElement = document.getElementById('root');

if (rootElement) {
  if (isSSR) {
    // SSR Mode: Hydrate the existing server-rendered content
    console.log('🚀 Hydrating SSR content...', initialState);
    
    ReactDOM.hydrateRoot(rootElement, 
      <React.StrictMode>
        <App initialState={initialState} />
      </React.StrictMode>
    );
  } else {
    // Client-only mode: Create new root
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

// Clean up global variables
if ('__INITIAL_STATE__' in window) {
  delete window.__INITIAL_STATE__;
}
if ('__SSR_ENABLED__' in window) {
  delete window.__SSR_ENABLED__;
}
