import { describe, expect, it, vi } from 'vitest'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import ErrorButton from '../errorBoundary/ErrorButton'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

const BrokenComponent = () => {
  throw new Error('Test crash')
}

describe('ErrorBoundary', () => {
  it('catches and handles JavaScript errors in child components', () => {
    render(
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <BrokenComponent />
      </ErrorBoundary>,
    )
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('displays fallback UI when error occurs', () => {
    render(
      <ErrorBoundary fallback={<div role="alert">Test Fallback UI</div>}>
        <BrokenComponent />
      </ErrorBoundary>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Test Fallback UI')
  })

  it('logs error to console', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary fallback={<p>Oops</p>}>
        <BrokenComponent />
      </ErrorBoundary>,
    )

    expect(errorSpy).toHaveBeenCalled()
  })
})

describe('ErrorButton', () => {
  it('throws error when test button is clicked', async () => {
    render(
      <ErrorBoundary fallback={<p role="alert">Fallback after error</p>}>
        <ErrorButton />
      </ErrorBoundary>,
    )
    const button = screen.getByText('Make an error')
    await userEvent.click(button)
    expect(screen.getByRole('alert')).toHaveTextContent('Fallback after error')
    expect(button).not.toBeInTheDocument()
  })

  it('triggers error boundary fallback UI after error', async () => {
    render(
      <ErrorBoundary fallback={<p role="alert">Something went wrong</p>}>
        <ErrorButton />
      </ErrorBoundary>,
    )
    const button = screen.getByText('Make an error')
    await userEvent.click(button)
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong')
  })
})
