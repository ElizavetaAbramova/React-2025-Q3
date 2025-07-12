import { Component, type ReactElement, type ReactNode } from 'react'
interface State {
  hasError: boolean
}

interface Props {
  fallback?: ReactElement
  children?: ReactNode
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    if (error) {
      return { hasError: true }
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

export default ErrorBoundary
