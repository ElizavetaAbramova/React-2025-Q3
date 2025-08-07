import '@testing-library/jest-dom'
import ProductDetails from '../productDetails/ProductDetails'
import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { useOutletContext } from 'react-router'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { api } from '../../api/api'

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    useOutletContext: vi.fn(),
  }
})
const mockedUseContext = vi.mocked(useOutletContext)

const mockStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

const mockProduct = {
  id: 1,
  title: 'string',
  description: 'description string',
  images: [],
  availabilityStatus: 'none',
  brand: 'string',
  price: 1.99,
}

describe('Details', () => {
  it('renders loading state initially', () => {
    mockedUseContext.mockReturnValue({
      productId: 5,
      handleCloseDetails: vi.fn(),
    })
    mockStore.dispatch(api.util.upsertQueryData('getItemById', 1, mockProduct))
    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <ProductDetails />
        </Provider>
      </MemoryRouter>,
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
  it('renders error state if productId is null', () => {
    mockedUseContext.mockReturnValue({
      productId: null,
      handleCloseDetails: vi.fn(),
    })

    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <ProductDetails />
        </Provider>
      </MemoryRouter>,
    )
    expect(screen.getByText('Ooops! Something went wrong.')).toBeInTheDocument()
  })
  it('renders product info on successful fetch', async () => {
    mockedUseContext.mockReturnValue({
      productId: 1,
      handleCloseDetails: vi.fn(),
    })
    mockStore.dispatch(api.util.upsertQueryData('getItemById', 1, mockProduct))
    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <ProductDetails />
        </Provider>
      </MemoryRouter>,
    )
    expect(screen.queryByText('Ooops! Something went wrong.')).not.toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
      expect(screen.getByText('description string')).toBeInTheDocument()
    })
  })
  it('calls handleCloseDetails when close button is clicked', async () => {
    const handleCloseDetails = vi.fn()

    mockedUseContext.mockReturnValue({
      productId: null,
      handleCloseDetails,
    })

    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <ProductDetails />
        </Provider>
      </MemoryRouter>,
    )
    const button = screen.getByRole('button', { name: 'X' })
    await userEvent.click(button)
    expect(handleCloseDetails).toHaveBeenCalledTimes(1)
  })
})
