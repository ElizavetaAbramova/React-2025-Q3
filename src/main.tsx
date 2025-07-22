import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<p>Unexpected error</p>}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
