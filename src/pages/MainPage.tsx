import '../styles/search.css'
import '../styles/card.css'
import '../styles/results-block.css'
import '../styles/error-button.css'
import { useState } from 'react'
import SearchBar from '../components/search/SearchBar'
import ResultsBlock from '../components/results/ResultsBlock'
import ErrorButton from '../components/errorBoundary/ErrorButton'
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary'
import getItems from '../api/getItems'

type Status = 'error' | 'loading' | 'fulfilled' | 'empty'

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('empty')
  const [searchResult, setSearchResult] = useState([])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setStatus('loading')
    try {
      const results = await getItems(query)
      setSearchResult(results)
      setStatus('fulfilled')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <h1>What are you looking for?</h1>
      <ErrorBoundary fallback={<p>Something went wrong, try to reload page</p>}>
        <SearchBar onSearch={handleSearch}></SearchBar>
        <ErrorButton></ErrorButton>
        <ResultsBlock
          searchResult={searchResult}
          searchQuery={searchQuery}
          status={status}
        ></ResultsBlock>
      </ErrorBoundary>
    </>
  )
}
