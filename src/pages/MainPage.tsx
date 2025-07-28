import '../styles/search.css'
import '../styles/results-block.css'
import '../styles/main-page.css'
import { useEffect, useState } from 'react'
import SearchBar from '../components/search/SearchBar'
import ResultsBlock from '../components/results/ResultsBlock'
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary'
import getItems from '../api/getItems'
import type { Status } from '../types&interfaces/Status'
import { Outlet, useNavigate, useSearchParams } from 'react-router'
import Pagination from '../components/pagination/Pagination'

export default function MainPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('empty')
  const [searchResult, setSearchResult] = useState([])
  const [isDetailsOpen, setDetailsStatus] = useState(false)
  const [productId, setProductId] = useState<number | null>(null)
  const [pages, setPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const skip = 10
  useEffect(() => {
    const page = searchParams.get('page')
    const search = searchParams.get('search')

    if (search && page) {
      setStatus('loading')
      handleSearch(search, Number(page), (Number(page) - 1) * skip)
    }
  }, [searchParams, skip])

  const handleOpenDetails = (id: number) => {
    setDetailsStatus(true)
    setProductId(id)
    const queryString = searchParams.toString()
    navigate(`productId/${id}?${queryString}`)
  }

  const handleCloseDetails = () => {
    setDetailsStatus(false)
    setProductId(null)
    navigate('/')
    setSearchParams({ search: searchQuery || '', page: currentPage.toString() })
  }

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams)
    const q = searchParams.get('search') || ''
    const shift = (page - 1) * skip
    params.set('page', page.toString())
    setCurrentPage(page)
    setDetailsStatus(false)
    setSearchParams(params)
    handleSearch(q, page, shift)
  }

  const handleSearch = async (query: string, page: number, shift = 0) => {
    if (isDetailsOpen) {
      setDetailsStatus(false)
      navigate('/')
      setSearchParams({ search: searchQuery || '', page: currentPage.toString() })
    }

    setStatus('loading')
    setSearchQuery(query)
    setCurrentPage(page)

    const params = new URLSearchParams(searchParams)
    params.set('search', query)
    params.set('page', page.toString())
    setSearchParams(params)

    try {
      const result = await getItems(query, shift)
      setPages(Math.ceil(result.total / 10))
      setSearchResult(result.list)
      setStatus('fulfilled')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="main-page">
      <ErrorBoundary fallback={<p>Something went wrong, try to reload page</p>}>
        <div className="search-block">
          <h2 className="main-text">What are you looking for?</h2>
          <SearchBar onSearch={handleSearch}></SearchBar>
          <ResultsBlock
            searchResult={searchResult}
            searchQuery={searchQuery}
            status={status}
            onItemClick={handleOpenDetails}
          ></ResultsBlock>
          {pages > 0 && (
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
