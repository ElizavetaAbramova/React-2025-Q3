import '../styles/search.css'
import '../styles/results-block.css'
import '../styles/main-page.css'
import { useState } from 'react'
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

  const handleOpenDetails = (id: number) => {
    setDetailsStatus(true)
    setProductId(id)
    navigate(`productId/${id}`)
  }

  const handleCloseDetails = () => {
    setDetailsStatus(false)
    setProductId(null)
    navigate('/')
    setSearchParams({ search: searchQuery || '', page: currentPage.toString() })
  }

  const handlePagination = (page: number) => {
    const q = searchParams.get('search') || ''
    setCurrentPage(page)
    setDetailsStatus(false)
    handleSearch(q, (page - 1) * skip)
    setSearchParams({ search: q, page: page.toString() })
  }

  const handleSearch = async (query: string, skip?: number) => {
    if (isDetailsOpen) {
      setDetailsStatus(false)
      navigate('/')
      setSearchParams({ search: searchQuery || '', page: currentPage.toString() })
    }
    if (query !== searchQuery) {
      setCurrentPage(1)
    }

    setStatus('loading')
    setSearchParams({ search: query })
    setSearchQuery(query)
    try {
      const result = await getItems(query, skip || 0)

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
