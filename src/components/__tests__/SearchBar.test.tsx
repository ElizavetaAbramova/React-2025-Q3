import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import SearchBar from '../search/SearchBar'

describe('SearchBar', () => {
  const mockOnSearch = vi.fn()

  beforeEach(() => {
    localStorage.clear()
    mockOnSearch.mockClear()
  })

  it('renders search input and search button', () => {
    render(<SearchBar onSearch={mockOnSearch} />)
    expect(screen.getByPlaceholderText('ex.: apple')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('displays previously saved search term from localStorage on mount', () => {
    const lastSavedSearch = 'grape'
    localStorage.setItem('AE-search-history', lastSavedSearch)

    render(<SearchBar onSearch={mockOnSearch} />)

    const input: HTMLInputElement = screen.getByPlaceholderText('ex.: apple')
    expect(input.value).toBe('grape')
  })

  it('shows empty input when no saved term exists', () => {
    render(<SearchBar onSearch={mockOnSearch} />)

    const input: HTMLInputElement = screen.getByPlaceholderText('ex.: apple')
    expect(input.value).toBe('')
  })

  it('updates input value when user types', async () => {
    render(<SearchBar onSearch={mockOnSearch} />)
    const input: HTMLInputElement = screen.getByPlaceholderText('ex.: apple')

    await userEvent.type(input, 'pineapple')

    expect(input.value).toBe('pineapple')
  })

  it('saves search term to localStorage when search button is clicked', async () => {
    render(<SearchBar onSearch={mockOnSearch} />)
    const input: HTMLInputElement = screen.getByPlaceholderText('ex.: apple')
    const button = screen.getByRole('button')

    await userEvent.type(input, 'kiwi')
    await userEvent.click(button)

    const stored = localStorage.getItem('AE-search-history')
    expect(stored).toContain('kiwi')
  })

  it('trims whitespace from search input before saving', async () => {
    render(<SearchBar onSearch={mockOnSearch} />)
    const input: HTMLInputElement = screen.getByPlaceholderText('ex.: apple')
    const button = screen.getByRole('button')

    await userEvent.type(input, '  mango  ')
    await userEvent.click(button)

    const saved = localStorage.getItem('AE-search-history')
    expect(saved).toContain('mango')
  })

  it('triggers search callback with correct parameters', async () => {
    render(<SearchBar onSearch={mockOnSearch} />)
    const input: HTMLInputElement = screen.getByPlaceholderText('ex.: apple')
    const button = screen.getByRole('button')

    await userEvent.type(input, 'peach')
    await userEvent.click(button)

    expect(mockOnSearch).toHaveBeenCalledTimes(1)
    expect(mockOnSearch).toHaveBeenCalledWith('peach')
  })

  it('retrieves saved search term on component mount', () => {
    const lastSavedSearch = 'carrot'
    localStorage.setItem('AE-search-history', lastSavedSearch)

    render(<SearchBar onSearch={mockOnSearch} />)

    const input: HTMLInputElement = screen.getByPlaceholderText('ex.: apple')
    expect(input.value).toBe('carrot')
  })

  it('overwrites existing localStorage value when new search is performed', async () => {
    const lastSavedSearch = 'banana'
    localStorage.setItem('AE-search-history', lastSavedSearch)

    render(<SearchBar onSearch={mockOnSearch} />)
    const input = screen.getByPlaceholderText('ex.: apple')
    const button = screen.getByRole('button')

    await userEvent.clear(input)
    await userEvent.type(input, 'orange')
    await userEvent.click(button)

    const updated = localStorage.getItem('AE-search-history')
    expect(updated).toContain('orange')
  })

  it('avoids duplicate entries in localStorage', async () => {
    const lastSavedSearch = 'banana'
    localStorage.setItem('AE-search-history', lastSavedSearch)

    render(<SearchBar onSearch={mockOnSearch} />)
    const input = screen.getByPlaceholderText('ex.: apple')
    const button = screen.getByRole('button')

    await userEvent.clear(input)
    await userEvent.type(input, 'banana')
    await userEvent.click(button)
    await userEvent.clear(input)
    await userEvent.type(input, 'banana')
    await userEvent.click(button)

    const updated = localStorage.getItem('AE-search-history')
    expect(updated).toBe('banana')
    expect(updated).not.toContain('bananabanana')
  })
})
