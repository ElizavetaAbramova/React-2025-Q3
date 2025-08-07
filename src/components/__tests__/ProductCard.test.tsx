import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import shoppingListReducer from '../../features/selectedItemsList/selectedItemsListSlice'
import { configureStore } from '@reduxjs/toolkit'
import type { CardProps } from '../../types&interfaces/CardProps'
import { Provider } from 'react-redux'
import ProductCard from '../results/ProductCard'
import userEvent from '@testing-library/user-event'
import { SearchResultContext } from '../results/SearchResultContext'

const storeMock = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
})

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
  handleOpenDetails: vi.fn(),
}

describe('Card Component', () => {
  it('displays card component and item name', () => {
    const mockCardProps: CardProps = {
      data: {
        id: 1,
        title: 'Test Title',
        description: 'Test Card Very Long Description',
        images: ['test.png'],
        availabilityStatus: 'In Stock',
        brand: 'Gussi',
        price: 45,
      },
      active: false,
      checked: false,
    }
    render(
      <Provider store={storeMock}>
        <SearchResultContext.Provider value={searchContextMock}>
          <ProductCard {...mockCardProps}></ProductCard>
        </SearchResultContext.Provider>
      </Provider>,
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })

  it('handles missing props', () => {
    render(
      <Provider store={storeMock}>
        <ProductCard {...({} as CardProps)}></ProductCard>
      </Provider>,
    )
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
    expect(screen.queryByText('Test Card Very Long Description')).not.toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('open details when user clicked on Card', async () => {
    const mockCardProps: CardProps = {
      data: {
        id: 1,
        title: 'Test Title',
        description: 'Test Card Very Long Description',
        images: ['test.png'],
        availabilityStatus: 'In Stock',
        brand: 'Gussi',
        price: 45,
      },
      active: false,
      checked: false,
    }
    render(
      <Provider store={storeMock}>
        <SearchResultContext.Provider value={searchContextMock}>
          <ProductCard {...mockCardProps}></ProductCard>
        </SearchResultContext.Provider>
      </Provider>,
    )
    const card = screen.getByTestId('card')
    await userEvent.click(card)
    expect(searchContextMock.handleOpenDetails).toBeCalled()
  })

  it('add item to list when user clicked on checkbox', async () => {
    const mockCardProps: CardProps = {
      data: {
        id: 1,
        title: 'Test Title',
        description: 'Test Card Very Long Description',
        images: ['test.png'],
        availabilityStatus: 'In Stock',
        brand: 'Gussi',
        price: 45,
      },
      active: false,
      checked: false,
    }
    render(
      <Provider store={storeMock}>
        <SearchResultContext.Provider value={searchContextMock}>
          <ProductCard {...mockCardProps}></ProductCard>
        </SearchResultContext.Provider>
      </Provider>,
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    await userEvent.click(checkbox)

    const state = storeMock.getState()
    expect(state.shoppingList.list).toBeTruthy()
    expect(state.shoppingList.list[0].id).toBe(mockCardProps.data.id)
  })
})
