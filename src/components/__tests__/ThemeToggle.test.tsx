import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ThemeSwitcher from '../themeToggle/ThemeToggle'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import themeReducer, { type ThemeState } from '../../features/theme/themeSlice'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

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

describe('ThemeToggle button', () => {
  it('should be in the app', () => {
    render(
      <Provider store={storeMock}>
        <ThemeSwitcher></ThemeSwitcher>
      </Provider>,
    )
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button').textContent).toBe('Dark theme')
  })

  it('should be switch the theme on click', async () => {
    render(
      <Provider store={storeMock}>
        <ThemeSwitcher></ThemeSwitcher>
      </Provider>,
    )
    const button = screen.getByRole('button')
    await userEvent.click(button)
    const newState = storeMock.getState().theme.mode
    expect(newState).toBe('dark')
  })
})
