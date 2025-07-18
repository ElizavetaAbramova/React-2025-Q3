import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import Card from '../results/Card'

const mockCardProps = {
  id: 1,
  title: 'Test Title',
  description: 'Test Card Very Long Description',
}

describe('Card Component', () => {
  it('displays item name and description correctly', () => {
    render(<Card data={mockCardProps} />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Card Very Long Description')).toBeInTheDocument()
  })

  it('handles missing props gracefully', () => {
    render(<Card />)
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
    expect(screen.queryByText('Test Card Very Long Description')).not.toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })
})
