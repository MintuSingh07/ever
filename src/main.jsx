import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'

// Register service worker — caches all assets on first load,
// serves from cache on subsequent visits, auto-updates in background.
if ('serviceWorker' in navigator) {
  registerSW({
    onNeedRefresh() {
      // New version available — update silently in background
      console.info('[SW] New content available, updating cache...')
    },
    onOfflineReady() {
      console.info('[SW] App is ready to work offline.')
    },
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

