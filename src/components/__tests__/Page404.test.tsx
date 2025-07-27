import { describe, expect, it } from 'vitest'
import Page404 from '../../pages/Page404'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router'

describe('AboutPage', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Page404></Page404>
      </MemoryRouter>,
    )
    expect(
      screen.getByText('Page not found. Incorrect URL or page does not exist anymore.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
