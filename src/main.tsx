import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TimezoneProvider } from './context/TimezoneContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TimezoneProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TimezoneProvider>
  </StrictMode>,
)
