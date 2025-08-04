import '../styles/search.css'
import '../styles/main-page.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import SearchBar from '../components/search/SearchBar'
import SearchResultBlock from '../components/results/SearchResultBlock'
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary'
import getItems from '../api/getItems'
import type { Status } from '../types&interfaces/Status'
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router'
import PaginationButtons from '../components/pagination/PaginationButtons'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import type { Item } from '../types&interfaces/Item'
import { SearchResultContext } from '../components/results/SearchResultContext'
import ShoppingList from '../components/ShoppingList/ShoppingList'

export default function MainPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('empty')
  const [searchResult, setSearchResult] = useState<Item[]>([])
  const [isDetailsOpen, setDetailsStatus] = useState(false)
  const [productId, setProductId] = useState<number>(0)
  const [pages, setPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const location = useLocation()
  const selectedItems = useSelector<RootState, Item[]>((state) => state.shoppingList.list)
  const skip = 10

  const handleOpenDetails = useCallback(
    (id: number) => {
      setDetailsStatus(true)
      setProductId(id)
      const queryString = searchParams.toString()
      navigate(`productId/${id}?${queryString}`)
    },
    [navigate, searchParams],
  )

  const handleCloseDetails = () => {
    setDetailsStatus(false)
    setProductId(0)
    navigate('/')
    const search = searchParams.get('search')
    if (search || search === '') {
      setSearchParams({ search: searchQuery || '', page: currentPage.toString() })
    }
  }

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams)
    const q = searchParams.get('search') || ''
    params.set('page', page.toString())
    if (isDetailsOpen) {
      handleCloseDetails()
    }
    handleSearch(q, page)
  }

  const handleSearch = (query: string, page: number) => {
    if (isDetailsOpen) {
      handleCloseDetails()
    }

    const params = new URLSearchParams(searchParams)
    params.set('search', query)
    params.set('page', page.toString())
    setSearchParams(params)
  }

  useEffect(() => {
    const page = searchParams.get('page')
    const search = searchParams.get('search')

    if (location.pathname.includes('product')) {
      handleCloseDetails()
    }

    if (search || search === '') {
      const shift = (Number(page) - 1) * skip
      setStatus('loading')
      setSearchQuery(search)
      setCurrentPage(Number(page))
      getItems(search, shift)
        .then((result) => {
          setPages(Math.ceil(result.total / skip))
          setSearchResult(result.list)
          setStatus('fulfilled')
        })
        .catch(() => {
          setStatus('error')
        })
    } else {
      setStatus('empty')
      setSearchResult([])
      setSearchQuery(null)
    }
  }, [searchParams, skip])

  const contextValue = useMemo(
    () => ({
      searchResult,
      productId,
      selectedItems,
      handleOpenDetails,
    }),
    [searchResult, productId, selectedItems, handleOpenDetails],
  )

  return (
    <div className="main-page" data-testid={'main'}>
      <ErrorBoundary fallback={<p>Something went wrong, try to reload page</p>}>
        <div className="search-block">
          <h2 className="main-text">What are you looking for?</h2>
          <div className="buttons-block">
            <SearchBar onSearch={handleSearch}></SearchBar>
            {selectedItems.length !== 0 && <ShoppingList list={selectedItems}></ShoppingList>}
          </div>
          <SearchResultContext.Provider value={contextValue}>
            {status === 'error' && <p>Error: could not get response from server</p>}
            {status === 'loading' && <p>Loading...</p>}
            {searchResult && status === 'fulfilled' && <SearchResultBlock />}
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
