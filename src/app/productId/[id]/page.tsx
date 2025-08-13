'use client'
import { useParams, useRouter } from 'next/navigation'
import ProductDetails from '../../../components/productDetails/ProductDetails'
import MainPage from '../../../pages/MainPage'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()

  if (!params || !params.id) {
    return <div>There is no product details</div>
  }

  return (
    <>
      <MainPage>
        <ProductDetails productId={Number(params.id)} handleCloseDetails={() => router.push('/')} />
      </MainPage>
    </>
  )
}
