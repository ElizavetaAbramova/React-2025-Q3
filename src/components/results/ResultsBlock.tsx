import Card from './Card'
import { type Item } from '../../types&interfaces/Item'
import { useContext } from 'react'
import { ResultContext } from './ResultsContext'

interface Props {
  onItemClick: (id: number) => void
}

export default function ResultsBlock(props: Props) {
  const context = useContext(ResultContext)

  if (!context) return <p>Error: could not get response from server</p>

  const { searchResult, productId, selectedItems } = context

  const renderContent = () => {
    if (searchResult.length === 0) {
      return <p>No results</p>
    }

    return searchResult.map((item: Item) => (
      <Card
        key={item.id}
        data={item}
        onClick={() => props.onItemClick(item.id)}
        active={item.id === productId}
        checked={selectedItems.some((selected) => selected.id === item.id)}
      />
    ))
  }

  return <div className="results-block">{renderContent()}</div>
}
