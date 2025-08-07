import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { configureStore } from '@reduxjs/toolkit'
import selectedItemsListReducer from '../../features/selectedItemsList/selectedItemsListSlice'
import { Provider } from 'react-redux'
import { useMainPageState } from '../../hooks/useMainPageState'

vi.mock('../api', () => ({
  useGetItemsQuery: vi.fn(),
  useGetItemByIdQuery: vi.fn(),
}))

vi.mock('../../hooks/useMainPageState', () => ({
  useMainPageState: vi.fn(),
}))

const storeMock = configureStore({
  reducer: {
    selectedItemsList: selectedItemsListReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

import { api } from '../../api/api'
import MainPage from '../../pages/MainPage'

const useMainPageStateMock = vi.mocked(useMainPageState)

describe('MainPage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('render main page section', () => {
    useMainPageStateMock.mockReturnValue({
      isError: false,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isDetailsOpen: false,
      productId: '',
      pages: 1,
      selectedItems: [],
      searchResult: [],
      currentPage: 1,
      handleOpenDetails: vi.fn(),
      handleCloseDetails: vi.fn(),
      handlePagination: vi.fn(),
      handleSearch: vi.fn(),
      refetch: vi.fn(),
    })

    render(
      <Provider store={storeMock}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    )

    const mainPage = screen.getByTestId('main')
    expect(mainPage).toBeInTheDocument()
  })

  it('handles search term from localStorage on initial load', () => {
    useMainPageStateMock.mockReturnValue({
      isError: false,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isDetailsOpen: false,
      productId: '',
      pages: 1,
      selectedItems: [],
      searchResult: [],
      currentPage: 1,
      handleOpenDetails: vi.fn(),
      handleCloseDetails: vi.fn(),
      handlePagination: vi.fn(),
      handleSearch: vi.fn(),
      refetch: vi.fn(),
    })

    const stored = JSON.stringify('testing')
    localStorage.setItem('AE-search-history', stored)
    render(
      <Provider store={storeMock}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    )
    const input: HTMLInputElement = screen.getByPlaceholderText('ex.: apple')
    expect(input).toBeInTheDocument()
    expect(input.value).toBe('testing')
  })

  it('shows loading state while fetching data', async () => {
    useMainPageStateMock.mockReturnValue({
      isError: false,
      isLoading: false,
      isFetching: true,
      isSuccess: false,
      isDetailsOpen: false,
      productId: '1',
      pages: 1,
      selectedItems: [],
      searchResult: [],
      currentPage: 1,
      handleOpenDetails: vi.fn(),
      handleCloseDetails: vi.fn(),
      handlePagination: vi.fn(),
      handleSearch: vi.fn(),
      refetch: vi.fn(),
    })

    render(
      <Provider store={storeMock}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    )

    const button = screen.getByRole('button', { name: 'Search' })
    await userEvent.click(button)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('handles successful API responses', async () => {
    useMainPageStateMock.mockReturnValue({
      isError: false,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isDetailsOpen: false,
      productId: '1',
      pages: 1,
      selectedItems: [],
      searchResult: [
        {
          id: 1,
          title: 'Test 1',
          description: 'Test 1 description string',
          images: [],
          availabilityStatus: 'none',
          brand: 'string',
          price: 1.99,
        },
        {
          id: 1,
          title: 'Test 2',
          description: 'Test 2 description string',
          images: [],
          availabilityStatus: 'none',
          brand: 'string',
          price: 1.99,
        },
      ],
      currentPage: 1,
      handleOpenDetails: vi.fn(),
      handleCloseDetails: vi.fn(),
      handlePagination: vi.fn(),
      handleSearch: vi.fn(),
      refetch: vi.fn(),
    })

    render(
      <Provider store={storeMock}>
        <MemoryRouter initialEntries={['/?search=test&page=1']}>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    )

    await waitFor(() => {
      expect(screen.getByText('Test 1')).toBeInTheDocument()
      expect(screen.getByText('Test 2')).toBeInTheDocument()
      expect(screen.queryByText('Test 3')).not.toBeInTheDocument()
    })
  })

  it('handles API error responses', async () => {
    useMainPageStateMock.mockReturnValue({
      isError: true,
      isLoading: false,
      isFetching: false,
      isSuccess: false,
      isDetailsOpen: false,
      productId: '',
      pages: 0,
      selectedItems: [],
      searchResult: [],
      currentPage: 0,
      handleOpenDetails: vi.fn(),
      handleCloseDetails: vi.fn(),
      handlePagination: vi.fn(),
      handleSearch: vi.fn(),
      refetch: vi.fn(),
    })

    render(
      <Provider store={storeMock}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getByText('Error: could not get response from server')).toBeInTheDocument()
  })

  it('open details with provided productId', async () => {
    const handleOpenDetailsMock = vi.fn()

    useMainPageStateMock.mockReturnValue({
      isError: false,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isDetailsOpen: false,
      productId: '1',
      pages: 1,
      selectedItems: [],
      searchResult: [
        {
          id: 1,
          title: 'Test 1',
          description: 'Test 1 description string',
          images: [],
          availabilityStatus: 'none',
          brand: 'string',
          price: 1.99,
        },
      ],
      currentPage: 1,
      handleOpenDetails: handleOpenDetailsMock,
      handleCloseDetails: vi.fn(),
      handlePagination: vi.fn(),
      handleSearch: vi.fn(),
      refetch: vi.fn(),
    })

    render(
      <Provider store={storeMock}>
        <MemoryRouter initialEntries={['/']}>
          <MainPage></MainPage>
        </MemoryRouter>
      </Provider>,
    )

    const productCard = await screen.findByText('Test 1')
    await userEvent.click(productCard)
    expect(handleOpenDetailsMock).toBeCalled()
    expect(handleOpenDetailsMock).toBeCalledWith(1)
  })

  it('change page when pagination button clicked', async () => {
    const handlePaginationMock = vi.fn()
    useMainPageStateMock.mockReturnValue({
      isError: false,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isDetailsOpen: false,
      productId: '1',
      pages: 2,
      selectedItems: [],
      searchResult: [
        {
          id: 1,
          title: 'Test 1',
          description: 'Test 1 description string',
          images: [],
          availabilityStatus: 'none',
          brand: 'string',
          price: 1.99,
        },
        {
          id: 11,
          title: 'Test 11',
          description: 'Test 11 description string',
          images: [],
          availabilityStatus: 'none',
          brand: 'string',
          price: 1.99,
        },
        {
          id: 111,
          title: 'Test 111',
          description: 'Test 111 description string',
          images: [],
          availabilityStatus: 'none',
          brand: 'string',
          price: 1.99,
        },
        {
          id: 12,
          title: 'Test 12',
          description: 'Test 12 description string',
          images: [],
          availabilityStatus: 'none',
          brand: 'string',
          price: 1.99,
        },
        {
          id: 122,
          title: 'Test 122',
          description: 'Test 122 description string',
          images: [],
          availabilityStatus: 'none',
          brand: 'string',
          price: 1.99,
        },
      ],
      currentPage: 1,
      handleOpenDetails: vi.fn(),
      handleCloseDetails: vi.fn(),
      handlePagination: handlePaginationMock,
      handleSearch: vi.fn(),
      refetch: vi.fn(),
    })

    render(
      <Provider store={storeMock}>
        <MemoryRouter initialEntries={['/']}>
          <MainPage></MainPage>
        </MemoryRouter>
      </Provider>,
    )

    const paginationButton = screen.getByText('2')
    await userEvent.click(paginationButton)
    expect(handlePaginationMock).toBeCalled()
  })

  it('displays "no results" message when data array is empty', async () => {
    useMainPageStateMock.mockReturnValue({
      isError: false,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isDetailsOpen: false,
      productId: '',
      pages: 1,
      selectedItems: [],
      searchResult: [],
      currentPage: 1,
      handleOpenDetails: vi.fn(),
      handleCloseDetails: vi.fn(),
      handlePagination: vi.fn(),
      handleSearch: vi.fn(),
      refetch: vi.fn(),
    })
    render(
      <Provider store={storeMock}>
        <MemoryRouter initialEntries={['/?search=test&page=1']}>
          <MainPage></MainPage>
        </MemoryRouter>
      </Provider>,
    )

    await waitFor(() => {
      expect(document.querySelector('.results-block')).toBeInTheDocument()
      expect(screen.getByText('No results')).toBeInTheDocument()
    })
  })
})
