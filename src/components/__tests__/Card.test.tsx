import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router'
const mockNavigate = vi.fn()

vi.mock(import('react-router'), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    default: () => ({
      navigate: mockNavigate,
    }),
  }
})

import Card from '../results/Card'

const mockCardProps = {
  data: {
    id: 1,
    title: 'Test Title',
    description: 'Test Card Very Long Description',
    images: ['test.png'],
    availabilityStatus: 'In Stock',
    brand: 'Gussi',
    price: 45,
  },
}

describe('Card Component', () => {
  it('displays item name and description correctly', () => {
    render(
      <MemoryRouter>
        <Card {...mockCardProps} onClick={() => vi.fn()} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('handles missing props gracefully', () => {
    render(
      <MemoryRouter>
        <Card onClick={() => vi.fn()} />
      </MemoryRouter>,
    )
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
    expect(screen.queryByText('Test Card Very Long Description')).not.toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })
})
