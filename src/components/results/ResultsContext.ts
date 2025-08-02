import { createContext } from 'react'
import type { Item } from '../../types&interfaces/Item'

interface ContextProps {
  searchResult: Item[]
  productId: number
  selectedItems: Item[]
}

export const ResultContext = createContext<ContextProps | null>(null)
