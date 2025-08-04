import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import '@testing-library/jest-dom'
import SearchResultBlock from '../results/SearchResultBlock'
import { SearchResultContext } from '../results/SearchResultContext'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import shoppingListReducer from '../../features/selectedItemsList/selectedItemsListSlice'

const storeMock = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
})

describe('ResultsBlock', () => {
  it('renders correct number of items when data is provided', async () => {
    const searchContextMock = {
      searchResult: [
        {
          id: 1,
          title: 'Item 1',
          images: ['test.png'],
          description: 'description string',
          availabilityStatus: 'string',
          brand: 'string',
          price: 1,
        },
        {
          id: 2,
          title: 'Item 2',
          images: ['test.png'],
          description: 'description string',
          availabilityStatus: 'string',
          brand: 'string',
          price: 1,
        },
      ],
      productId: 2,
      selectedItems: [
        {
          id: 1,
          title: 'Item 1',
          images: ['test.png'],
          description: 'description string',
          availabilityStatus: 'string',
          brand: 'string',
          price: 1,
        },
      ],
    }
    render(
      <Provider store={storeMock}>
        <SearchResultContext.Provider value={searchContextMock}>
          <SearchResultBlock onItemClick={() => vi.fn()} />
        </SearchResultContext.Provider>
      </Provider>,
    )
    expect(document.querySelector('.results-block')).toBeInTheDocument()
    expect(document.querySelectorAll('.result-card').length).toBe(
      searchContextMock.searchResult.length,
    )
  })

  it('correctly displays item names', () => {
    const searchContextMock = {
      searchResult: [
        {
          id: 1,
          title: 'Item 1',
          images: ['test.png'],
          description: 'description string',
          availabilityStatus: 'string',
          brand: 'string',
          price: 1,
        },
        {
          id: 2,
          title: 'Item 2',
          images: ['test.png'],
          description: 'description string',
          availabilityStatus: 'string',
          brand: 'string',
          price: 1,
        },
      ],
      productId: 2,
      selectedItems: [
        {
          id: 1,
          title: 'Item 1',
          images: ['test.png'],
          description: 'description string',
          availabilityStatus: 'string',
          brand: 'string',
          price: 1,
        },
      ],
    }
    render(
      <Provider store={storeMock}>
        <SearchResultContext.Provider value={searchContextMock}>
          <SearchResultBlock onItemClick={() => vi.fn()} />
        </SearchResultContext.Provider>
      </Provider>,
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.queryByText('Item 3')).not.toBeInTheDocument()
  })

  it('handles missing or undefined data gracefully', () => {
    render(<SearchResultBlock onItemClick={() => vi.fn()} />)
    expect(document.querySelector('.results-block')).not.toBeInTheDocument()
    expect(document.querySelectorAll('.result-card').length).toBe(0)
    expect(screen.getByText('Error: could not get response from server')).toBeInTheDocument()
  })
})
