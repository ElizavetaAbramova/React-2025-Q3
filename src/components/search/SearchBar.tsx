import { useEffect, useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar(props: SearchBarProps) {
  const [input, setInput] = useState('')

  useEffect(() => {
    const lastSearch = localStorage.getItem('AE-search-history')
    if (lastSearch) {
      setInput(lastSearch)
    }
  }, [])

  const handleSearchClick = () => {
    if (input.length !== 0) {
      props.onSearch(input)
      localStorage.setItem('AE-search-history', input)
    } else {
      props.onSearch('')
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

      <button className="search-button" name="Search" onMouseDown={handleSearchClick}>
        Search
      </button>
    </div>
  )
}
