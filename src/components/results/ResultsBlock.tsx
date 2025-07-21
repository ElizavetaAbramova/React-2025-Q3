import Card from './Card'
import type { Status } from '../../types/Status'

interface Item {
  id: number
  title: string
  description: string
}
interface Props {
  searchResult?: Item[]
  searchQuery?: string | null
  status?: Status
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

      return props.searchResult.map((item: Item) => <Card key={item.id} data={item} />)
    }
  }

  return <div className="results-block">{renderContent()}</div>
}
