import { describe, expect, it, vi } from 'vitest'
import getItems from '../../api/getItems'

describe('Integration API', () => {
  it('return correct data if response valid', async () => {
    const mockProducts = [{ id: 1, title: 'Test 1', description: 'test' }]

    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ products: mockProducts }),
    })

    const result = await getItems('')

    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products')
    expect(result).toEqual(mockProducts)
  })
  it('return error if response in not valid', async () => {
    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 501,
    })

    expect(getItems('fail')).rejects.toThrow('Failed to load data. Error code: 501')
  })
})
