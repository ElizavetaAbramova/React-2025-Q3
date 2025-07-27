import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import MainPage from '../pages/MainPage'
import AboutPage from '../pages/AboutPage'
import Page404 from '../pages/Page404'
import Details from '../components/details/Details'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/',
        element: <MainPage />,
        children: [{ path: 'productId/:productId', element: <Details /> }],
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
])
