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
  active?: boolean
}

export default function Card(props: CardProps) {
  const { data } = props
  const className = props.active ? 'result-card active' : 'result-card'
  if (!data) return <p>Something went wrong</p>

  return (
    <div
      className={className}
      onClick={() => {
        //if event target is checkbox => props.onCheck
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
      {/* <checkbox></checkbox> */}
    </div>
  )
}
