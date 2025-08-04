import { createContext } from 'react'
import type { Item } from '../../types&interfaces/Item'

interface ContextProps {
  searchResult: Item[]
  productId: number
  selectedItems: Item[]
  handleOpenDetails: (id: number) => void
}

export const SearchResultContext = createContext<ContextProps | null>(null)
