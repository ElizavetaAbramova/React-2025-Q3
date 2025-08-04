import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import shoppingListReducer from '../../features/shoppingList/shoppingListSlice'
import { configureStore } from '@reduxjs/toolkit'
import type { CardProps } from '../../types&interfaces/CardProps'
import { Provider } from 'react-redux'
import ProductCard from '../results/ProductCard'
import userEvent from '@testing-library/user-event'

const storeMock = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
})

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
      onClick: vi.fn(),
      active: false,
      checked: false,
    }
    render(
      <Provider store={storeMock}>
        <ProductCard {...mockCardProps}></ProductCard>
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
      onClick: vi.fn(),
      active: false,
      checked: false,
    }
    render(
      <Provider store={storeMock}>
        <ProductCard {...mockCardProps}></ProductCard>
      </Provider>,
    )
    const card = screen.getByTestId('card')
    await userEvent.click(card)
    expect(mockCardProps.onClick).toBeCalled()
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
      onClick: vi.fn(),
      active: false,
      checked: false,
    }
    render(
      <Provider store={storeMock}>
        <ProductCard {...mockCardProps}></ProductCard>
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
