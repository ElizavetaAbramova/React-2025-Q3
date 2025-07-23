import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<p>Unexpected error</p>}>
      <RouterProvider router={router}></RouterProvider>
    </ErrorBoundary>
  </StrictMode>,
)
