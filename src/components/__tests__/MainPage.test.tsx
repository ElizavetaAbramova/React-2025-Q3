import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import getItems from '../../api/getItems'
import { MemoryRouter } from 'react-router'
import { configureStore } from '@reduxjs/toolkit'
import shoppingListReducer from '../../features/shoppingList/shoppingListSlice'
import { Provider } from 'react-redux'

const mockNavigate = vi.fn()

vi.mock('../../api/getItems', () => ({
  default: vi.fn(),
}))

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockedGetItems = vi.mocked(getItems)

import MainPage from '../../pages/MainPage'

const storeMock = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
})

describe('MainPage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockedGetItems.mockReset()
    vi.clearAllMocks()
  })
  it('render main page section', () => {
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
    mockedGetItems.mockReturnValue(new Promise(() => {}))
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

  it('calls API with correct parameters', async () => {
    mockedGetItems.mockResolvedValue({ list: [], total: 0, currentPage: 1 })
    render(
      <Provider store={storeMock}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    )

    const input = screen.getByPlaceholderText('ex.: apple')
    const button = screen.getByRole('button', { name: 'Search' })
    await userEvent.click(button)
    await waitFor(() => {
      expect(mockedGetItems).toBeCalledWith('', 0)
    })

    await userEvent.type(input, 'apple')
    await userEvent.click(button)
    await waitFor(() => {
      expect(mockedGetItems).toBeCalledWith('apple', 0)
    })
  })

  it('handles successful API responses', async () => {
    const mockResults = {
      list: [
        { id: 11, title: 'Apple', images: 'test.png', brand: 'Gussi' },
        { id: 22, title: 'Orange', images: 'test.png', brand: 'Gussi' },
        { id: 33, title: 'Banana', images: 'test.png', brand: 'Gussi' },
      ],
      total: 3,
      currentPage: 1,
    }
    mockedGetItems.mockResolvedValue(mockResults)
    render(
      <Provider store={storeMock}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    )
    const button = screen.getByRole('button', { name: 'Search' })
    await userEvent.click(button)
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Orange')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
  })

  it('handles API error responses', async () => {
    mockedGetItems.mockRejectedValueOnce(new Error('API failed'))
    render(
      <Provider store={storeMock}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    )
    const button = screen.getByRole('button', { name: 'Search' })
    await userEvent.click(button)
    expect(screen.getByText('Error: could not get response from server')).toBeInTheDocument()
  })

  it('open details with provided productId', async () => {
    mockedGetItems.mockResolvedValueOnce({
      list: [
        { id: 1, title: 'Test 1', images: 'test.png', description: 'test test' },
        { id: 2, title: 'Test 2', images: 'test.png', description: 'product product' },
      ],
      total: 2,
      currentPage: 1,
    })

    render(
      <Provider store={storeMock}>
        <MemoryRouter initialEntries={['/']}>
          <MainPage></MainPage>
        </MemoryRouter>
      </Provider>,
    )

    const button = screen.getByRole('button', { name: 'Search' })
    await userEvent.click(button)
    const productCard = await screen.findByText('Test 1')
    await userEvent.click(productCard)
    expect(mockNavigate).toBeCalled()
  })

  it('change page when pagination button clicked', async () => {
    mockedGetItems.mockResolvedValue({
      list: [
        { id: 1, title: 'Test 1', images: 'test.png', description: 'test test' },
        { id: 2, title: 'Test 2', images: 'test.png', description: 'product product' },
        { id: 1, title: 'Test 1', images: 'test.png', description: 'test test' },
        { id: 1, title: 'Test 1', images: 'test.png', description: 'test test' },
        { id: 1, title: 'Test 1', images: 'test.png', description: 'test test' },
        { id: 1, title: 'Test 1', images: 'test.png', description: 'test test' },
        { id: 1, title: 'Test 1', images: 'test.png', description: 'test test' },
        { id: 1, title: 'Test 1', images: 'test.png', description: 'test test' },
        { id: 1, title: 'Test 1', images: 'test.png', description: 'test test' },
        { id: 1, title: 'Test 1', images: 'test.png', description: 'test test' },
        { id: 1, title: 'Test 1', images: 'test.png', description: 'test test' },
        { id: 1, title: 'Test 1', images: 'test.png', description: 'test test' },
        { id: 1, title: 'Test 1', images: 'test.png', description: 'test test' },
      ],
      total: 13,
      currentPage: 1,
    })

    render(
      <Provider store={storeMock}>
        <MemoryRouter initialEntries={['/']}>
          <MainPage></MainPage>
        </MemoryRouter>
      </Provider>,
    )
    const button = screen.getByRole('button', { name: 'Search' })
    await userEvent.click(button)
    const paginationButton = screen.getByText('2')
    await userEvent.click(paginationButton)
    expect(mockedGetItems).toBeCalledTimes(2)
  })

  it('displays "no results" message when data array is empty', async () => {
    mockedGetItems.mockResolvedValue({
      list: [],
      total: 0,
      currentPage: 1,
    })

    render(
      <Provider store={storeMock}>
        <MemoryRouter initialEntries={['/']}>
          <MainPage></MainPage>
        </MemoryRouter>
      </Provider>,
    )
    const button = screen.getByRole('button', { name: 'Search' })
    await userEvent.click(button)
    expect(document.querySelector('.results-block')).toBeInTheDocument()
    expect(screen.getByText('No results')).toBeInTheDocument()
  })
})
