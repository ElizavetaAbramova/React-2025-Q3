import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import getItems from '../../api/getItems'

vi.mock('../../api/getItems', () => ({
  default: vi.fn(),
}))
const mockedGetItems = vi.mocked(getItems)

import MainPage from '../../pages/MainPage'

describe('MainPage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockedGetItems.mockReset()
  })

  it('handles search term from localStorage on initial load', () => {
    localStorage.setItem('AE-search-history', 'testing')
    render(<MainPage />)
    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input.value).toBe('testing')
  })

  it('manages loading states during API calls', async () => {
    mockedGetItems.mockReturnValue(new Promise(() => {}))
    render(<MainPage />)
    const button = screen.getByRole('button', { name: 'Search' })
    await userEvent.click(button)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('calls API with correct parameters', async () => {
    mockedGetItems.mockResolvedValue([])
    render(<MainPage />)
    const input = screen.getByPlaceholderText('ex.: apple')
    const button = screen.getByRole('button', { name: 'Search' })
    await userEvent.click(button)
    await waitFor(() => {
      expect(mockedGetItems).toBeCalledWith('')
    })

    await userEvent.type(input, 'apple')
    await userEvent.click(button)
    await waitFor(() => {
      expect(mockedGetItems).toBeCalledWith('apple')
    })
  })

  it('handles successful API responses', async () => {
    const mockResults = [
      { id: 11, title: 'Apple', description: 'Juicy and green' },
      { id: 22, title: 'Orange', description: 'Sour and orange' },
      { id: 33, title: 'Banana', description: 'Sweet and yellow' },
    ]
    mockedGetItems.mockResolvedValue(mockResults)
    render(<MainPage />)
    const button = screen.getByRole('button', { name: 'Search' })
    await userEvent.click(button)
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Orange')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
  })

  it('handles API error responses', async () => {
    mockedGetItems.mockRejectedValueOnce(new Error('API failed'))
    render(<MainPage />)
    const button = screen.getByRole('button', { name: 'Search' })
    await userEvent.click(button)
    expect(screen.getByText('Error: could not get response from server')).toBeInTheDocument()
  })

  it('updates component state based on API responses', async () => {
    mockedGetItems.mockResolvedValueOnce([
      { id: 1, title: 'Test 1', description: 'test' },
      { id: 2, title: 'Test 2', description: 'test test' },
    ])
    render(<MainPage />)
    const button = screen.getByRole('button', { name: 'Search' })
    await userEvent.click(button)

    expect(screen.getByText('Test 1')).toBeInTheDocument()
    expect(screen.getByText('test test')).toBeInTheDocument()
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    expect(screen.queryByText('No results')).not.toBeInTheDocument()
    expect(screen.queryByText('Kiwi')).not.toBeInTheDocument()

    mockedGetItems.mockResolvedValueOnce([])
    await userEvent.click(button)
    expect(screen.getByText('No results')).toBeInTheDocument()
  })
})
