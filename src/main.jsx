import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './i18n'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)

// Signal to prerenderer that the page is ready
if (typeof requestIdleCallback !== 'undefined') {
  requestIdleCallback(() => document.dispatchEvent(new Event('prerender-ready')))
} else {
  setTimeout(() => document.dispatchEvent(new Event('prerender-ready')), 200)
} 