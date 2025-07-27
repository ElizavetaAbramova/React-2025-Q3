import { describe, expect, it, vi } from 'vitest'
import getItems from '../../api/getItems'
import getItemById from '../../api/getItemById'

describe('Function getItems', () => {
  it('return correct data if response valid', async () => {
    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ products: [], total: 2, skip: 0 }),
    })

    const result = await getItems('')

    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products/search?limit=10&skip=0')
    expect(result.total).toEqual(2)
    expect(result.currentPage).toEqual(1)
    expect(result.list).toEqual([])
  })
  it('return error if response in not valid', async () => {
    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 501,
    })

    expect(getItems('fail')).rejects.toThrow('Failed to load data. Error code: 501')
  })
})

describe('Function getItemById', () => {
  it('return correct data if response valid', async () => {
    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 2,
        title: 'mascara',
        description: 'very long description',
        brand: 'Prada',
        price: '1.99',
      }),
    })

    const result = await getItemById('2')

    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products/2')
    expect(result.id).toEqual(2)
    expect(result.title).toEqual('mascara')
    expect(result.price).toEqual('1.99')
  })
  it('return error if response in not valid', async () => {
    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 501,
    })

    expect(getItemById('fail')).rejects.toThrow('Failed to load data. Error code: 501')
  })
})
