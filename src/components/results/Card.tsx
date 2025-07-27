import '../../styles/card.css'
interface CardProps {
  data?: {
    id: number
    title: string
    description: string
    images: string[]
    availabilityStatus: string
    brand: string
    price: number
  }
  onClick: () => void
}

export default function Card(props: CardProps) {
  const { data } = props
  if (!data) return <p>Something went wrong</p>

  return (
    <div
      className="result-card"
      onClick={() => {
        props.onClick()
      }}
    >
      <img
        src={data.images[0] || 'assets/image-placeholder.png'}
        alt="product-image"
        width={100}
        height={100}
      />
      <div>{data.title}</div>
    </div>
  )
}
