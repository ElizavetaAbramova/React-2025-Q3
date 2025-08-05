import '../../styles/product-details.css'
import { useOutletContext } from 'react-router'
import { useGetItemByIdQuery } from '../../api/api'

interface Props {
  productId: number
  handleCloseDetails: () => void
}

export default function ProductDetails() {
  const { productId, handleCloseDetails } = useOutletContext<Props>()
  const {
    data: product,
    isFetching,
    isError,
  } = useGetItemByIdQuery(productId, {
    skip: productId === 0 || productId === null,
  })

  return (
    <div className="details-block">
      <button className="close-button" onClick={() => handleCloseDetails()}>
        X
      </button>
      <div className="details-content">
        {isFetching && <p>Loading...</p>}
        {(isError || !productId) && <p>Ooops! Something went wrong.</p>}
        {!isFetching && product && (
          <>
            <img
              src={product.images[1] || '/assets/image-placeholder.png'}
              alt="product-images"
              className="product-img"
            />
            <p>{product.title}</p>
            <div>{product.availabilityStatus}</div>
            <div>Brand: {product.brand}</div>
            <div>{product.description}</div>
            <div>${product.price}</div>
          </>
        )}
      </div>
    </div>
  )
}
