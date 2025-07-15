import { Component, type BaseSyntheticEvent } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

interface State {
  inputValue: string
  lastSavedSearch: string
  showSearchHistory: boolean
}

class SearchBar extends Component<SearchBarProps, State> {
  constructor(props: SearchBarProps) {
    super(props)
    this.state = {
      inputValue: '',
      lastSavedSearch: '',
      showSearchHistory: false,
    }
  }

  componentDidMount = (): void => {
    const lastSearch = localStorage.getItem('AE-search-history')

    if (lastSearch) {
      this.setState({
        lastSavedSearch: lastSearch,
        inputValue: lastSearch,
      })
    }
  }

  handleInputChange = (event: BaseSyntheticEvent) => {
    this.setState({ inputValue: event.target.value })
  }

  handleSearchClick = () => {
    const input = this.state.inputValue.trim()
    if (input.length !== 0) {
      this.props.onSearch(input)
      localStorage.setItem('AE-search-history', input)
      this.setState({ lastSavedSearch: input })
    } else {
      this.props.onSearch('')
    }
  }

  render() {
    return (
      <div className="search-bar">
        <div className="search-input-block">
          <input
            className="search-input"
            placeholder="ex.: apple"
            onChange={this.handleInputChange}
            value={this.state.inputValue}
          ></input>
        </div>
        <button className="search-button" onMouseDown={this.handleSearchClick}>
          Search
        </button>
      </div>
    )
  }
}

export default SearchBar
