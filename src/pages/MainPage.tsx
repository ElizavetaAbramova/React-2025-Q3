import '../styles/search.css'
import '../styles/card.css'
import '../styles/results-block.css'
import '../styles/error-button.css'
import { Component } from 'react'
import SearchBar from '../components/search/SearchBar'
import ResultsBlock from '../components/results/ResultsBlock'
import ErrorButton from '../components/errorBoundary/ErrorButton'
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary'
import getItems from '../api/getItems'

interface State {
  searchQuery: string | null
  searchResult: []
  status: 'error' | 'loading' | 'fulfilled' | 'empty'
}

class MainPage extends Component<object, State> {
  constructor(props: object) {
    super(props)
    this.state = {
      searchQuery: null,
      searchResult: [],
      status: 'empty',
    }
  }

  handleSearch = async (query: string) => {
    this.setState({ searchQuery: query, status: 'loading' })
    try {
      const results = await getItems(query)
      this.setState({ searchResult: results, status: 'fulfilled' })
    } catch {
      this.setState({ status: 'error' })
    }
  }

  render() {
    return (
      <>
        <h1>What are you looking for?</h1>
        <ErrorBoundary fallback={<p>Something went wrong, try to reload page</p>}>
          <SearchBar onSearch={this.handleSearch}></SearchBar>
          <ErrorButton></ErrorButton>
          <ResultsBlock
            searchResult={this.state.searchResult}
            searchQuery={this.state.searchQuery}
            status={this.state.status}
          ></ResultsBlock>
        </ErrorBoundary>
      </>
    )
  }
}

export default MainPage
