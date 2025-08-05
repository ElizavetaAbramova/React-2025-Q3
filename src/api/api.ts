import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Item } from '../types&interfaces/Item'

interface GetItemsResponse {
  list: Item[]
  total: number
  currentPage: number
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getItems: builder.query<GetItemsResponse, { param: string; skip: number }>({
      query: ({ param, skip }) => {
        const limit = 10
        const encoded = encodeURIComponent(param)
        return param === ''
          ? `products/search?limit=${limit}&skip=${skip}`
          : `products/search?q=${encoded}&limit=${limit}&skip=${skip}`
      },
      transformResponse: (response: { products: Item[]; total: number; skip: number }) => ({
        list: response.products,
        total: response.total,
        currentPage: response.skip + 1,
      }),
    }),
    getItemById: builder.query<Item, number>({
      query: (id) => `products/${id.toString()}`,
    }),
  }),
})

export const { useGetItemsQuery, useGetItemByIdQuery } = api
