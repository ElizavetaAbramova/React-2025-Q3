import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import '@testing-library/jest-dom'
import ResultsBlock from '../results/ResultsBlock'
import { MemoryRouter } from 'react-router'

describe('ResultsBlock', () => {
  it('renders correct number of items when data is provided', async () => {
    const searchResultMock = [
      { id: 1, title: 'string', images: 'test.png', brand: 'Gussi' },
      { id: 2, title: 'string', images: 'test.png', brand: 'Gussi' },
    ]
    const { rerender } = render(
      <MemoryRouter>
        <ResultsBlock searchQuery="" searchResult={searchResultMock} status="fulfilled" />
      </MemoryRouter>,
    )
    expect(document.querySelector('.results-block')).toBeInTheDocument()
    expect(document.querySelectorAll('.result-card').length).toBe(searchResultMock.length)

    const searchResultSecondMock = [
      { id: 1, title: 'test', images: 'test.png', brand: 'Gussi' },
      { id: 2, title: 'test', images: 'test.png', brand: 'Gussi' },
      { id: 3, title: 'test', images: 'test.png', brand: 'Gussi' },
    ]
    rerender(
      <MemoryRouter>
        <ResultsBlock searchQuery="" searchResult={searchResultSecondMock} status="fulfilled" />,
      </MemoryRouter>,
    )
    expect(document.querySelector('.results-block')).toBeInTheDocument()
    expect(document.querySelectorAll('.result-card').length).toBe(searchResultSecondMock.length)
  })

  it('displays "no results" message when data array is empty', async () => {
    const searchResultMock: [] = []
    render(<ResultsBlock searchQuery="" searchResult={searchResultMock} status="fulfilled" />)
    expect(document.querySelector('.results-block')).toBeInTheDocument()
    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('shows loading state while fetching data', () => {
    render(<ResultsBlock searchQuery="" searchResult={[]} status="loading" />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('correctly displays item names and descriptions', () => {
    const searchResultMock = [
      { id: 1, title: 'string1', images: 'test.png', brand: 'Gussi' },
      { id: 2, title: 'string2', images: 'test.png', brand: 'Gussi' },
      { id: 3, title: 'string3', images: 'test.png', brand: 'Gussi' },
    ]
    render(
      <MemoryRouter>
        <ResultsBlock searchQuery="" searchResult={searchResultMock} status="fulfilled" />
      </MemoryRouter>,
    )
    expect(screen.getByText('string1')).toBeInTheDocument()
    expect(screen.getByText('string2')).toBeInTheDocument()
    expect(screen.getByText('string3')).toBeInTheDocument()
  })

  it('handles missing or undefined data gracefully', () => {
    expect(() =>
      render(<ResultsBlock searchResult={undefined} searchQuery={undefined} status={undefined} />),
    ).not.toThrow()
    render(<ResultsBlock searchResult={undefined} searchQuery={undefined} status={undefined} />)
    expect(document.querySelector('.results-block')).toBeInTheDocument()
    expect(document.querySelectorAll('.result-card').length).toBe(0)
  })

  it('displays error message when API call fails', () => {
    render(<ResultsBlock searchResult={undefined} searchQuery={undefined} status="error" />)
    expect(screen.getByText('Error: could not get response from server')).toBeInTheDocument()
  })
})
