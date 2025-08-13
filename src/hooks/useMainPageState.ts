'use client'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router'
import type { Item } from '../types&interfaces/Item'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { useGetItemsQuery } from '../api/api'
import { usePathname, useRouter } from 'next/navigation'

export function useMainPageState() {
  const { productId } = useParams()
  const router = useRouter()
  const pathname = usePathname()

  // const [searchParams, setSearchParams] = useSearchParams()
  // const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const selectedItems = useSelector<RootState, Item[]>((state) => state.selectedItemsList.list)

  // const search = searchParams.get('search') ?? ''
  const search = ''
  // const page = Number(searchParams.get('page') ?? 1)
  const page = 1
  const offset = (page - 1) * 10

  const { data, isLoading, isError, isSuccess, isFetching, refetch } = useGetItemsQuery(
    { param: search, offset },
    { skip: search === null },
  )

  const handlePagination = (page: number) => {
    // const params = new URLSearchParams(searchParams)
    // const q = searchParams.get('search') || ''
    // params.set('page', page.toString())
    if (pathname?.includes('productId')) {
      router.push('/')
    }
    handleSearch('', page)
  }

  const handleSearch = (query: string, page: number) => {
    if (pathname?.includes('productId')) {
      router.push('/')
      console.log(query, page)
    }

    // const params = new URLSearchParams(searchParams)
    // params.set('search', query)
    // params.set('page', page.toString())
    // setSearchParams(params)
  }

  const pages = data ? Math.ceil(data.total / 10) : 0

  useMemo(
    () => {
      // if (location.pathname.includes('productId')) {
      //   setDetailsStatus(true)
      // }
      if (search || search === '') {
        // setSearchQuery(search)
        setCurrentPage(page)
      }
    },
    [page, search],
    // [location.pathname, page, search]
  )

  return {
    isError,
    isLoading,
    isFetching,
    isSuccess,
    productId,
    pages,
    selectedItems,
    searchResult: data?.list || [],
    currentPage,
    handlePagination,
    handleSearch,
    refetch,
  }
}
