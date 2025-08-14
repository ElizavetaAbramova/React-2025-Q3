'use client'
import { useMemo, useState } from 'react'
import type { Item } from '../types&interfaces/Item'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { useGetItemsQuery } from '../api/api'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useMainPageState() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const selectedItems = useSelector<RootState, Item[]>((state) => state.selectedItemsList.list)

  const search = searchParams?.get('search') ?? ''
  const page = Number(searchParams?.get('page') ?? 1)
  const offset = (page - 1) * 10

  const { data, isLoading, isError, isSuccess, isFetching, refetch } = useGetItemsQuery(
    { param: search, offset },
    { skip: search === null },
  )
  const pages = data ? Math.ceil(data.total / 10) : 0

  const handlePagination = (page: number) => {
    if (pathname?.includes('productId')) {
      router.push('/')
    }
    if (searchParams) {
      const q = searchParams.get('search') || ''
      handleSearch(q, page)
    }
  }

  const handleSearch = (query: string, page: number) => {
    if (pathname?.includes('productId')) {
      router.push('/')
    }
    if (searchParams) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('search', query)
      params.set('page', page.toString())
      router.push(`${pathname}?${params.toString()}`)
    }
  }

  useMemo(() => {
    if (search || search === '') {
      setCurrentPage(page)
    }
  }, [page, search])

  return {
    isError,
    isLoading,
    isFetching,
    isSuccess,
    pages,
    selectedItems,
    searchResult: data?.list || [],
    currentPage,
    handlePagination,
    handleSearch,
    refetch,
  }
}
