import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PerformanceProfileProvider } from './hooks/usePerformanceProfile'
import './styles/globals.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PerformanceProfileProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PerformanceProfileProvider>
  </StrictMode>,
)
