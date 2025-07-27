import type { Item } from '../types&interfaces/Item'

export default async function getItemById(id: string): Promise<Item> {
  const url = `https://dummyjson.com/products/${id}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to load data. Error code: ${response.status}`)
  }
  const jsonObj = await response.json()
  return jsonObj
}
