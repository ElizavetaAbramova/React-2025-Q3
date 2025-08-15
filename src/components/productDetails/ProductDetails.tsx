'use client'
import '../../styles/product-details.css'
import { useGetItemByIdQuery } from '../../api/api'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
interface Props {
  productId: number
  handleCloseDetails: () => void
}

export default function ProductDetails({ productId, handleCloseDetails }: Props) {
  const t = useTranslations('main')
  const {
    data: product,
    isFetching,
    isError,
    refetch,
  } = useGetItemByIdQuery(productId, {
    skip: productId === 0 || productId === null,
  })

  return (
    <div className="details-block">
      <button className="close-button" onClick={() => handleCloseDetails()}>
        X
      </button>
      <div className="details-content">
        {isFetching && <p>{t('loading')}</p>}
        {(isError || !productId) && <p>{t('error-message')}</p>}
        {!isFetching && !isError && product && (
          <>
            <Image
              className="product-img"
              alt="product-images"
              src={product.images[1] || '/assets/image-placeholder.png'}
              width={250}
              height={250}
            ></Image>
            <p>{product.title}</p>
            <div>{product.availabilityStatus}</div>
            <div>Brand: {product.brand}</div>
            <div>{product.description}</div>
            <div>${product.price}</div>
          </>
        )}
      </div>
      <button onClick={() => refetch()}>{t('reload')}</button>
    </div>
  )
}
