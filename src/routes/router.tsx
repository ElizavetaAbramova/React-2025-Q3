import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import MainPage from '../pages/MainPage'
import AboutPage from '../pages/AboutPage'
import Page404 from '../pages/Page404'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
])
