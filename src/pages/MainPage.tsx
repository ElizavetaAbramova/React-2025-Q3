import '../styles/search.css'
import '../styles/card.css'
import '../styles/results-block.css'
import '../styles/error-button.css'
import { Component } from 'react'
import SearchBar from '../components/search/SearchBar'
import ResultsBlock from '../components/results/ResultsBlock'
import ErrorButton from '../components/errorBoundary/ErrorButton'
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary'

interface State {
  searchQuery: string
}

class MainPage extends Component {
  constructor(props: object) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }

  state: State = {
    //check LS, if it is not empty, take the last
    searchQuery: '',
  }

  handleSearch(query: string) {
    console.log('onsearch', query)
    this.setState({ searchQuery: query })
  }

  componentDidUpdate(prevProps: object, prevState: State) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      console.log('state', this.state.searchQuery)
    }
  }

  render() {
    return (
      <>
        <h1>What do you want to find?</h1>
        <ErrorBoundary fallback={<p>Something went wrong, try to reload page</p>}>
          <SearchBar onSearch={this.handleSearch}></SearchBar>
          <ErrorButton></ErrorButton>
          <ResultsBlock searchQuery={this.state.searchQuery}></ResultsBlock>
        </ErrorBoundary>
      </>
    )
  }
}

export default MainPage
