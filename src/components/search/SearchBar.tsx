import { useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

interface SearchBarProps {
  onSearch: (query: string, page: number, shift?: number) => void
}

export default function SearchBar(props: SearchBarProps) {
  const [input, setInput] = useState('')
  const [searchHistory, setSearchHistory] = useLocalStorage('AE-search-history')
  const page = 1

  useEffect(() => {
    if (searchHistory) {
      setInput(searchHistory)
    }
  }, [searchHistory])

  const handleSearchClick = () => {
    if (input.length !== 0) {
      props.onSearch(input.trim(), page)
      setSearchHistory(input.trim())
    } else {
      props.onSearch('', page)
    }
  }

  return (
    <div className="search-bar">
      <input
        name="Search"
        className="search-input"
        placeholder="ex.: apple"
        onChange={(event) => setInput(event.target.value)}
        value={input}
      ></input>

      <button className="search-button" name="Search" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  )
}
