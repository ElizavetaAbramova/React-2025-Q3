import { Component, type BaseSyntheticEvent } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

interface State {
  inputValue: string
}

class SearchBar extends Component<SearchBarProps, State> {
  constructor(props: SearchBarProps) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  state: State = {
    inputValue: '',
  }

  handleInputChange(event: BaseSyntheticEvent) {
    // console.log(event)
    this.setState({ inputValue: event.target.value })
  }

  handleClick() {
    const input = this.state.inputValue
    if (input.length !== 0) {
      console.log('onclick', input)
      this.props.onSearch(input)
      // this.props.onSearch(this.state.inputValue)

      //change searchQuery in resultsBlock
      //rerender resultsBlock
    }

    // console.log('ok')
    // const res = await getItems('1')
    // if (res.length !== 0) {
    //   console.log(res)
    // }
  }

  render() {
    return (
      <div className="search-bar">
        <input
          className="search-input"
          placeholder="ex.: kiwi"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        ></input>
        <button className="search-button" onClick={this.handleClick}>
          Search
        </button>
      </div>
    )
  }
}

export default SearchBar
