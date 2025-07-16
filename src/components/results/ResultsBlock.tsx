import { Component } from 'react'
import Card from './Card'

interface Item {
  id: number
  title: string
  description: string
}
interface Props {
  searchResult?: Item[]
  searchQuery?: string | null
  status?: 'error' | 'loading' | 'fulfilled' | 'empty'
}

class ResultsBlock extends Component<Props> {
  renderContent() {
    if (this.props.status === 'error') {
      return <p>Error: could not get response from server</p>
    }

    if (this.props.status === 'loading') {
      return <p>Loading...</p>
    }
    if (this.props.searchResult && this.props.searchQuery && this.props.status) {
      if (this.props.searchResult.length === 0 && this.props.searchQuery !== null) {
        return <p>No results</p>
      }

      return this.props.searchResult.map((item: Item) => <Card key={item.id} data={item} />)
    }
  }

  render() {
    return <div className="results-block">{this.renderContent()}</div>
  }
}

export default ResultsBlock
