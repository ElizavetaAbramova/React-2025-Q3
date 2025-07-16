import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import '@testing-library/jest-dom'
import ResultsBlock from '../results/ResultsBlock'

describe('ResultsBlock', () => {
  it('renders correct number of items when data is provided', async () => {
    const searchResultMock = [
      { id: 1, title: 'string', description: 'test' },
      { id: 2, title: 'string', description: 'test' },
    ]

    const { rerender } = render(
      <ResultsBlock searchQuery="" searchResult={searchResultMock} status="fulfilled" />,
    )
    expect(document.querySelector('.results-block')).toBeInTheDocument()
    expect(document.querySelectorAll('.result-card').length).toBe(searchResultMock.length)

    const searchResultSecondMock = [
      { id: 1, title: 'test', description: 'string' },
      { id: 2, title: 'test', description: 'string' },
      { id: 3, title: 'test', description: 'string' },
    ]
    rerender(
      <ResultsBlock searchQuery="" searchResult={searchResultSecondMock} status="fulfilled" />,
    )

    expect(document.querySelector('.results-block')).toBeInTheDocument()
    expect(document.querySelectorAll('.result-card').length).toBe(searchResultSecondMock.length)
  })

  it('displays "no results" message when data array is empty', async () => {
    const searchResultMock: [] = []
    const { rerender } = render(
      <ResultsBlock searchQuery="" searchResult={searchResultMock} status="empty" />,
    )
    expect(screen.getByText('No results')).toBeInTheDocument()
    rerender(<ResultsBlock searchQuery="" searchResult={searchResultMock} status="fulfilled" />)
    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('shows loading state while fetching data', () => {
    render(<ResultsBlock searchQuery="" searchResult={[]} status="loading" />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('correctly displays item names and descriptions', () => {
    const searchResultMock = [
      { id: 1, title: 'string1', description: 'test1' },
      { id: 2, title: 'string2', description: 'test2' },
      { id: 3, title: 'string3', description: 'test3' },
    ]

    render(<ResultsBlock searchQuery="" searchResult={searchResultMock} status="fulfilled" />)

    for (const item of searchResultMock) {
      expect(screen.getByText(item.title)).toBeInTheDocument()
      expect(screen.getByText(item.description)).toBeInTheDocument()
    }
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
