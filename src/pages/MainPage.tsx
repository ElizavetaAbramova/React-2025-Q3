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

class MainPage extends Component<object, State> {
  constructor(props: object) {
    super(props)
    this.state = {
      searchQuery: '',
    }
  }

  componentDidMount = (): void => {
    const localStorageState = localStorage.getItem('AE-search-history')

    if (localStorageState) {
      const savedHistory = JSON.parse(localStorageState)
      const lastSearchString = savedHistory[savedHistory - 1]
      this.setState({ searchQuery: lastSearchString })
    }
  }
  handleSearch = (query: string) => {
    this.setState({ searchQuery: query })
  }

  render() {
    return (
      <>
        <h1>What are you looking for?</h1>
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
