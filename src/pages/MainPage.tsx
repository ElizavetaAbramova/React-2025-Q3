import '../styles/search.css'
import '../styles/results-block.css'
import '../styles/main-page.css'
import { useCallback, useEffect, useState } from 'react'
import SearchBar from '../components/search/SearchBar'
import ResultsBlock from '../components/results/ResultsBlock'
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary'
import getItems from '../api/getItems'
import type { Status } from '../types&interfaces/Status'
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router'
import Pagination from '../components/pagination/Pagination'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import type { Item } from '../types&interfaces/Item'
import { ResultContext } from '../components/results/ResultsContext'

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

  const handleCloseDetails = useCallback(() => {
    setDetailsStatus(false)
    setProductId(0)
    navigate('/')
    const search = searchParams.get('search')
    if (search) {
      setSearchParams({ search: searchQuery || '', page: currentPage.toString() })
    }
  }, [currentPage, navigate, searchParams, searchQuery, setSearchParams])

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams)
    const q = searchParams.get('search') || ''
    params.set('page', page.toString())
    if (isDetailsOpen) {
      handleCloseDetails()
    }

    setCurrentPage(page)
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
    console.log('use')
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
  }, [searchParams, skip, location, handleCloseDetails])
  // const contextForResultBlock = useMemo(
  //   () => ({ searchResult, status, productId, selectedItems, handleOpenDetails }),
  //   [searchResult, status, productId, selectedItems, handleOpenDetails],
  // )

  return (
    <div className="main-page">
      <ErrorBoundary fallback={<p>Something went wrong, try to reload page</p>}>
        <div className="search-block">
          <h2 className="main-text">What are you looking for?</h2>
          <SearchBar onSearch={handleSearch}></SearchBar>
          <ResultContext.Provider
            value={{ searchResult, status, productId, selectedItems, handleOpenDetails }}
          >
            <ResultsBlock />
          </ResultContext.Provider>
          {pages > 0 && searchResult.length > 1 && (
            <Pagination pages={pages} onChangePage={handlePagination} activePage={currentPage} />
          )}
        </div>
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>Something went wrong, try to reload page</p>}>
        {isDetailsOpen && <Outlet context={{ productId, handleCloseDetails }}></Outlet>}
      </ErrorBoundary>
    </div>
  )
}
