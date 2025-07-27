import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router'
import App from '../../App'
import Page404 from '../../pages/Page404'
import MainPage from '../../pages/MainPage'
import AboutPage from '../../pages/AboutPage'
import Details from '../details/Details'
import getItemById from '../../api/getItemById'

describe('Router', () => {
  it('renders MainPage on / route', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <App />,
          errorElement: <Page404 />,
          children: [
            {
              path: '/',
              element: <MainPage />,
            },
          ],
        },
      ],
      { initialEntries: ['/'] },
    )

    render(<RouterProvider router={router} />)

    expect(await screen.findByText('What are you looking for?')).toBeInTheDocument()
  })
  it('renders AboutPage on /about route', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <App />,
          errorElement: <Page404 />,
          children: [
            {
              path: 'about',
              element: <AboutPage />,
            },
          ],
        },
      ],
      { initialEntries: ['/about'] },
    )

    render(<RouterProvider router={router} />)

    expect(screen.getByRole('heading')).toBeInTheDocument()
    expect(await screen.findByText(/RSSchool/i)).toBeInTheDocument()
  })

  it('renders Page404 on unknown route', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <App />,
          errorElement: <Page404 />,
          children: [
            {
              path: '/about',
              element: <AboutPage />,
            },
          ],
        },
      ],
      { initialEntries: ['/fake-page'] },
    )

    render(<RouterProvider router={router} />)

    expect(
      screen.getByText('Page not found. Incorrect URL or page does not exist anymore.'),
    ).toBeInTheDocument()
  })

  it('renders Details with context from Outlet', async () => {
    vi.mock('../../api/getItemById', () => ({
      default: vi.fn(),
    }))
    const mockedGetItemById = vi.mocked(getItemById)
    mockedGetItemById.mockResolvedValue({
      id: 1,
      title: 'string',
      description: 'description string',
      images: [],
      availabilityStatus: 'none',
      brand: 'string',
      price: 1.99,
    })

    const MockContextProvider = () => (
      <Outlet context={{ productId: 1, handleCloseDetails: vi.fn() }} />
    )

    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <MockContextProvider />,
          children: [
            {
              path: 'productId/:productId',
              element: <Details />,
            },
          ],
        },
      ],
      { initialEntries: ['/productId/1'] },
    )

    render(<RouterProvider router={router} />)

    await waitFor(() => {
      expect(screen.getByText('string')).toBeInTheDocument()
    })
  })
})
