export interface CardProps {
  data: {
    id: number
    title: string
    description: string
    images: string[]
    availabilityStatus: string
    brand: string
    price: number
  }
  active?: boolean
  checked: boolean
}
