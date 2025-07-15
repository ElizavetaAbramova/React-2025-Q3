import { Component } from 'react'
interface CardProps {
  data?: {
    id: number
    title: string
    description: string
  }
}
class Card extends Component<CardProps> {
  render() {
    const { data } = this.props
    if (!data) return <p>Something went wrong</p>
    return (
      <div className="result-card">
        <p>{data.title}</p> <p>{data.description}</p>
      </div>
    )
  }
}

export default Card
