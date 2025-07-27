import { describe, expect, it } from 'vitest'
import Navbar from '../navigation/NavBar'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router'

describe('AboutPage', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Navbar></Navbar>
      </MemoryRouter>,
    )
    expect(screen.getByRole('button', { name: 'Main' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'About' })).toBeInTheDocument()
  })
})
