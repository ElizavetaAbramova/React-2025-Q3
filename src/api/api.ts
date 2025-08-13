import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Item } from '../types&interfaces/Item'

export interface GetItemsResponse {
  list: Item[]
  total: number
  currentPage: number
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Item', 'Items'],
  endpoints: (builder) => ({
    getItems: builder.query<GetItemsResponse, { param: string; offset: number }>({
      query: ({ param, offset }) => {
        const limit = 10
        const encoded = encodeURIComponent(param)
        return param === ''
          ? `products/search?limit=${limit}&skip=${offset}`
          : `products/search?q=${encoded}&limit=${limit}&skip=${offset}`
      },
      transformResponse: (response: { products: Item[]; total: number; skip: number }) => ({
        list: response.products,
        total: response.total,
        currentPage: response.skip + 1,
      }),
      keepUnusedDataFor: 60,
      providesTags: ['Items'],
    }),
    getItemById: builder.query<Item, number>({
      query: (id) => `products/${id.toString()}`,
      keepUnusedDataFor: 30,
      providesTags: ['Item'],
    }),
  }),
})

export const { useGetItemsQuery, useGetItemByIdQuery } = api
