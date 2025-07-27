import '@testing-library/jest-dom'
import Details from '../details/Details'
import { describe, expect, it, vi } from 'vitest'
import getItemById from '../../api/getItemById'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { useOutletContext } from 'react-router'
import userEvent from '@testing-library/user-event'

vi.mock('../../api/getItemById', () => ({
  default: vi.fn(),
}))
const mockedGetItemById = vi.mocked(getItemById)

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    useOutletContext: vi.fn(),
  }
})
const mockedUseContext = vi.mocked(useOutletContext)

describe('Details', () => {
  it('renders loading state initially', () => {
    mockedGetItemById.mockReturnValue(new Promise(() => {}))
    mockedUseContext.mockReturnValue({
      productId: 5,
      handleCloseDetails: vi.fn(),
    })
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>,
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
  it('renders error state if productId is null', () => {
    mockedUseContext.mockReturnValue({
      productId: null,
      handleCloseDetails: vi.fn(),
    })
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>,
    )
    expect(screen.getByText('Ooops! Something went wrong.')).toBeInTheDocument()
  })
  it('renders product info on successful fetch', async () => {
    mockedUseContext.mockReturnValue({
      productId: 1,
      handleCloseDetails: vi.fn(),
    })
    mockedGetItemById.mockResolvedValue({
      id: 1,
      title: 'string',
      description: 'description string',
      images: [],
      availabilityStatus: 'none',
      brand: 'string',
      price: 1.99,
    })
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>,
    )
    expect(screen.queryByText('Ooops! Something went wrong.')).not.toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
      expect(screen.getByText('description string')).toBeInTheDocument()
    })
  })
  it('calls handleCloseDetails when close button is clicked', async () => {
    const handleCloseDetails = vi.fn()

    mockedUseContext.mockReturnValue({
      productId: null,
      handleCloseDetails,
    })
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>,
    )
    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(handleCloseDetails).toHaveBeenCalledTimes(1)
  })
})
