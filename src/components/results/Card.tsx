interface CardProps {
  data?: {
    title: string
    description: string
  }
}

export default function Card(props: CardProps) {
  const { data } = props
  if (!data) return <p>Something went wrong</p>

  return (
    <div className="result-card">
      <p>{data.title}</p> <p>{data.description}</p>
    </div>
  )
}
