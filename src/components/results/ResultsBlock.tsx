import Card from './Card'
import type { Status } from '../../types&interfaces/Status'
import { type Item } from '../../types&interfaces/Item'

interface Props {
  searchResult?: Item[]
  searchQuery?: string | null
  status?: Status
  onItemClick: (id: number) => void
  currentItem: number
}

export default function ResultsBlock(props: Props) {
  const renderContent = () => {
    if (props.status === 'error') {
      return <p>Error: could not get response from server</p>
    }

    if (props.status === 'loading') {
      return <p>Loading...</p>
    }

    if (props.searchResult && props.status) {
      if (props.searchResult.length === 0 && props.searchQuery !== null) {
        return <p>No results</p>
      }

      return props.searchResult.map((item: Item) =>
        item.id === props.currentItem ? (
          <Card
            key={item.id}
            data={item}
            onClick={() => props.onItemClick(item.id)}
            active={true}
          />
        ) : (
          <Card key={item.id} data={item} onClick={() => props.onItemClick(item.id)} />
        ),
      )
    }
  }

  return <div className="results-block">{renderContent()}</div>
}
