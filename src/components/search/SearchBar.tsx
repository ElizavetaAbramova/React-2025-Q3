import { Component, type BaseSyntheticEvent } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

interface State {
  inputValue: string
  searchHistory: string[]
  showSearchHistory: boolean
}

class SearchBar extends Component<SearchBarProps, State> {
  constructor(props: SearchBarProps) {
    super(props)
  }

  state: State = {
    inputValue: '',
    searchHistory: [],
    showSearchHistory: false,
  }

  handleInputChange = (event: BaseSyntheticEvent) => {
    this.setState({ inputValue: event.target.value })
  }

  handleSearchClick = () => {
    const input = this.state.inputValue
    if (input.length !== 0) {
      this.props.onSearch(input)
      const searchHistory: string[] = []
      const localStorageState = localStorage.getItem('AE-search-history')
      if (localStorageState) {
        const savedHistory: string[] = JSON.parse(localStorageState)
        savedHistory.map((item) => {
          if (item !== input) {
            searchHistory.push(item)
          }
        })
      }
      searchHistory.push(input)
      localStorage.setItem('AE-search-history', JSON.stringify(searchHistory))
    }
  }

  handleInputFocus = () => {
    this.setState({
      showSearchHistory: true,
    })
  }

  handleHistoryClick = (item: string) => {
    this.setState({
      inputValue: item,
      showSearchHistory: false,
    })
  }

  handleInputBlur = () => {
    this.setState({ showSearchHistory: false })
  }

  render() {
    const localStorageState = localStorage.getItem('AE-search-history')

    if (localStorageState) {
      const savedHistory = JSON.parse(localStorageState)
      this.state.searchHistory = savedHistory
    }

    return (
      <div className="search-bar">
        <div className="search-input-block">
          <input
            className="search-input"
            placeholder="ex.: apple"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
          ></input>
          {this.state.showSearchHistory && this.state.searchHistory.length !== 0 && (
            <ul className="search-history-dropdown">
              {this.state.searchHistory.map((item, index) => (
                <li
                  key={index}
                  className="search-history-item"
                  onMouseDown={() => this.handleHistoryClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="search-button" onClick={this.handleSearchClick}>
          Search
        </button>
      </div>
    )
  }
}

export default SearchBar
