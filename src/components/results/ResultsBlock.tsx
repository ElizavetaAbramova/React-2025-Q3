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
  searchQuery: string
}

class ResultsBlock extends Component<Props, State> {
  state: State = {
    results: [],
    loading: true,
    error: null,
  }

  async componentDidMount() {
    try {
      const results = await getItems(this.props.searchQuery)
      this.setState({ results, loading: false })
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error'
      this.setState({ error, loading: false })
    }
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ loading: true })
      const results = await getItems(this.props.searchQuery)
      this.setState({ results, loading: false })
    }
  }

  renderContent() {
    const { results } = this.state

    if (results.length === 0) {
      return <p>No results</p>
    }

    return results.map((item: Item) => <Card key={item.id} data={item} />)
  }

  render() {
    const { loading, error } = this.state

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
      <div className="results-block">
        <p className="results-header">Results for search: {this.props.searchQuery}</p>
        {this.renderContent()}
      </div>
    )
  }
}

export default ResultsBlock
