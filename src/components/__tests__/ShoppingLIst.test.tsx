import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ShoppingList from '../ShoppingList/ShoppingList'
import { configureStore } from '@reduxjs/toolkit'
import shoppingListReducer, {
  type ShoppingListState,
} from '../../features/shoppingList/shoppingListSlice'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

const preloadedState: { shoppingList: ShoppingListState } = {
  shoppingList: {
    list: [
      {
        id: 1,
        title: 'Test Item',
        description: 'Some description',
        images: ['image.png'],
        availabilityStatus: 'In stock',
        brand: 'TestBrand',
        price: 100,
      },
    ],
  },
}

const mockCreateObjectURL = vi.fn(() => 'blob:mock')
window.URL.createObjectURL = mockCreateObjectURL

const storeMock = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
  preloadedState,
})

describe('ShoppingList block', () => {
  it('should render buttons and items counter', () => {
    const mockProps = {
      list: [
        {
          id: 1,
          title: 'Test Item',
          description: 'Some description',
          images: ['image.png'],
          availabilityStatus: 'In stock',
          brand: 'TestBrand',
          price: 100,
        },
      ],
    }

    render(
      <Provider store={storeMock}>
        <ShoppingList {...mockProps}></ShoppingList>
      </Provider>,
    )
    expect(screen.getByText('Selected 1 item(s)')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Download shopping list' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear list' })).toBeInTheDocument()
  })

  it('should clear list when button "clear list" clicked', async () => {
    const mockProps = {
      list: [
        {
          id: 1,
          title: 'Test Item',
          description: 'Some description',
          images: ['image.png'],
          availabilityStatus: 'In stock',
          brand: 'TestBrand',
          price: 100,
        },
      ],
    }

    render(
      <Provider store={storeMock}>
        <ShoppingList {...mockProps}></ShoppingList>
      </Provider>,
    )

    const button = screen.getByRole('button', { name: 'Clear list' })
    await userEvent.click(button)
    const state = storeMock.getState()
    expect(state.shoppingList.list.length).toBe(0)
  })

  it('download file when button "download list" clicked', async () => {
    const mockProps = {
      list: [
        {
          id: 1,
          title: 'Test Item',
          description: 'Some description',
          images: ['image.png'],
          availabilityStatus: 'In stock',
          brand: 'TestBrand',
          price: 100,
        },
      ],
    }

    render(
      <Provider store={storeMock}>
        <ShoppingList {...mockProps}></ShoppingList>
      </Provider>,
    )

    const button = screen.getByRole('button', { name: 'Download shopping list' })
    await userEvent.click(button)
    expect(mockCreateObjectURL).toHaveBeenCalled()
  })
})
