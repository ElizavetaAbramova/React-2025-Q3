'use client'
import ProductCard from './ProductCard'
import { type Item } from '../../types&interfaces/Item'
import { useContext } from 'react'
import { SearchResultContext } from './SearchResultContext'
import '../../styles/search-results-block.css'

export default function SearchResultBlock() {
  const context = useContext(SearchResultContext)

  if (!context) return <p>Error: could not get response from server</p>

  const { searchResult, productId, selectedItems } = context

  const renderContent = () => {
    if (searchResult.length !== 0) {
      return searchResult.map((item: Item) => (
        <ProductCard
          key={item.id}
          data={item}
          active={item.id === productId}
          checked={selectedItems.some((selected) => selected.id === item.id)}
        />
      ))
    }
  }

  return <div className="results-block">{renderContent()}</div>
}
