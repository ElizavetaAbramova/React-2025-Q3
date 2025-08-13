'use client'
import '../styles/search.css'
import '../styles/main-page.css'
import SearchBar from '../components/search/SearchBar'
import SearchResultBlock from '../components/results/SearchResultBlock'
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary'
import PaginationButtons from '../components/pagination/PaginationButtons'
import { SearchResultContext } from '../components/results/SearchResultContext'
import SelectedItemsFlyout from '../components/SelectedItemsFlyout/SelectedItemsFlyout'
import { useMainPageState } from '../hooks/useMainPageState'
import { api } from '../api/api'
import { useDispatch } from 'react-redux'
interface MainPageProps {
  children?: React.ReactNode
}

export default function MainPage({ children }: MainPageProps) {
  const {
    isError,
    isFetching,
    isLoading,
    isSuccess,
    productId,
    pages,
    searchResult,
    currentPage,
    selectedItems,
    handlePagination,
    handleSearch,
  } = useMainPageState()

  const dispatch = useDispatch()

  const contextValue = {
    searchResult,
    productId: Number(productId) || 0,
    selectedItems,
  }

  return (
    <div className="main-page" data-testid={'main'}>
      <ErrorBoundary fallback={<p>Something went wrong, try to reload page</p>}>
        <div className="search-block">
          <h2 className="main-text">What are you looking for?</h2>
          <div className="buttons-block">
            <SearchBar onSearch={handleSearch}></SearchBar>
            <button
              style={{ maxHeight: '45px' }}
              onClick={() => {
                dispatch(api.util.invalidateTags(['Items']))
              }}
            >
              Refresh
            </button>
            {selectedItems.length !== 0 && (
              <SelectedItemsFlyout list={selectedItems}></SelectedItemsFlyout>
            )}
          </div>
          <SearchResultContext.Provider value={contextValue}>
            {isError && <p>Error: could not get response from server</p>}
            {(isLoading || isFetching) && <p>Loading...</p>}
            {isSuccess && searchResult.length === 0 && <p>No results</p>}
            {!isFetching && isSuccess && searchResult && <SearchResultBlock />}
          </SearchResultContext.Provider>
          {pages > 0 && searchResult.length > 1 && (
            <PaginationButtons
              pages={pages}
              onChangePage={handlePagination}
              activePage={currentPage}
            />
          )}
        </div>
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>Something went wrong, try to reload page</p>}>
        {children}
      </ErrorBoundary>
    </div>
  )
}
