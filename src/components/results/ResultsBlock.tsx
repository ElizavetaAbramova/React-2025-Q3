import { Component } from 'react'
import getItems from '../../api/getItems'
import Card from './Card'

interface Item {
  id: number
  title: string
  description: string
}

interface State {
  results: Item[]
  loading: boolean
  error: string | null
}

interface Props {
  searchQuery: string | null
}

class ResultsBlock extends Component<Props, State> {
  state: State = {
    results: [],
    loading: false,
    error: null,
  }

  componentDidUpdate = async (prevProps: Props): Promise<void> => {
    if (prevProps.searchQuery !== this.props.searchQuery && this.props.searchQuery !== null) {
      this.setState({ loading: true })
      const results = await getItems(this.props.searchQuery)
      this.setState({ results, loading: false })
    }
  }

  renderContent() {
    const { results, loading } = this.state

    if (results.length === 0 && !loading && this.props.searchQuery !== null) {
      return <p>No results</p>
    }

    return results.map((item: Item) => <Card key={item.id} data={item} />)
  }

  render() {
    const { loading, error } = this.state

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return <div className="results-block">{this.renderContent()}</div>
  }
}

export default ResultsBlock
