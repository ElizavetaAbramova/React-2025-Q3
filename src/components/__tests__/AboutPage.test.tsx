import { describe, expect, it } from 'vitest'
import AboutPage from '../../pages/AboutPage'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('AboutPage', () => {
  it('render correctly', () => {
    render(<AboutPage></AboutPage>)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toBeTruthy()
    expect(screen.getAllByRole('img')).toBeTruthy()
  })
})
