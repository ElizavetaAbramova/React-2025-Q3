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
    this.state = {
      inputValue: '',
      searchHistory: [],
      showSearchHistory: false,
    }
  }

  componentDidMount = (): void => {
    const localStorageState = localStorage.getItem('AE-search-history')

    if (localStorageState) {
      const savedHistory = JSON.parse(localStorageState)
      this.setState({ searchHistory: savedHistory })
    }
  }

  handleInputChange = (event: BaseSyntheticEvent) => {
    this.setState({ inputValue: event.target.value })
  }

  handleSearchClick = () => {
    const input = this.state.inputValue
    if (input.length !== 0) {
      this.props.onSearch(input)
      const searchHistoryDropdownList: string[] = []
      const localStorageState = localStorage.getItem('AE-search-history')

      if (localStorageState) {
        const savedHistory: string[] = JSON.parse(localStorageState)
        savedHistory.map((item) => {
          if (item !== input) {
            searchHistoryDropdownList.push(item)
          }
        })
      }
      searchHistoryDropdownList.push(input)
      localStorage.setItem('AE-search-history', JSON.stringify(searchHistoryDropdownList))
      this.setState({ searchHistory: searchHistoryDropdownList })
    } else {
      this.props.onSearch('')
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
        <button className="search-button" onMouseDown={this.handleSearchClick}>
          Search
        </button>
      </div>
    )
  }
}

export default SearchBar
