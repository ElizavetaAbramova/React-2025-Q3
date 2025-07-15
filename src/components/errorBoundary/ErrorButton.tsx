import { Component } from 'react'

class ErrorButton extends Component {
  state = {
    shouldThrow: false,
  }

  handleClick = () => {
    this.setState({ shouldThrow: true })
  }

  render() {
    if (this.state.shouldThrow) {
      throw new Error('error in render')
    }

    return (
      <div className="error-button-block">
        <button className="error-button" onClick={this.handleClick}>
          Make an error
        </button>
      </div>
    )
  }
}

export default ErrorButton
