import { Component } from 'react'
interface CardProps {
  data: {
    id: number
    title: string
    description: string
  }
}
class Card extends Component<CardProps> {
  render() {
    const { data } = this.props
    return (
      <div className="result-card">
        <p>{data.title}</p> <p>{data.description}</p>
      </div>
    )
  }
}

export default Card
