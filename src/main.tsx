import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router.tsx'
import { store } from './store/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<p>Unexpected error</p>}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
