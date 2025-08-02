import { describe, expect, it } from 'vitest'
import Navbar from '../navigation/NavBar'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import themeReducer, { type ThemeState } from '../../features/theme/themeSlice'

const preloadedState: {
  theme: ThemeState
} = {
  theme: {
    mode: 'light',
  },
}

const storeMock = configureStore({
  reducer: {
    theme: themeReducer,
  },
  preloadedState,
})

describe('AboutPage', () => {
  it('renders correctly', () => {
    render(
      <Provider store={storeMock}>
        <MemoryRouter>
          <Navbar></Navbar>
        </MemoryRouter>
      </Provider>,
    )
    expect(screen.getByRole('button', { name: 'Main' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'About' })).toBeInTheDocument()
  })
})
