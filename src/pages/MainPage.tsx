import '../styles/search.css'
import '../styles/main-page.css'
import SearchBar from '../components/search/SearchBar'
import SearchResultBlock from '../components/results/SearchResultBlock'
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary'
import { Outlet } from 'react-router'
import PaginationButtons from '../components/pagination/PaginationButtons'
import { SearchResultContext } from '../components/results/SearchResultContext'
import SelectedItemsFlyout from '../components/SelectedItemsFlyout/SelectedItemsFlyout'
import { useMainPageState } from '../hooks/useMainPageState'

export default function MainPage() {
  const {
    status,
    contextValue,
    isDetailsOpen,
    productId,
    handleCloseDetails,
    pages,
    searchResult,
    currentPage,
    handlePagination,
    selectedItems,
    handleSearch,
  } = useMainPageState()

  return (
    <div className="main-page" data-testid={'main'}>
      <ErrorBoundary fallback={<p>Something went wrong, try to reload page</p>}>
        <div className="search-block">
          <h2 className="main-text">What are you looking for?</h2>
          <div className="buttons-block">
            <SearchBar onSearch={handleSearch}></SearchBar>
            {selectedItems.length !== 0 && (
              <SelectedItemsFlyout list={selectedItems}></SelectedItemsFlyout>
            )}
          </div>
          <SearchResultContext.Provider value={contextValue}>
            {status === 'error' && <p>Error: could not get response from server</p>}
            {status === 'loading' && <p>Loading...</p>}
            {status === 'empty' && <p>No results</p>}
            {searchResult && status === 'success' && <SearchResultBlock />}
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
        {isDetailsOpen && <Outlet context={{ productId, handleCloseDetails }}></Outlet>}
      </ErrorBoundary>
    </div>
  )
}
