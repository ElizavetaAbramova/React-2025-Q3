import '../../styles/details.css'
import { type Item } from '../../types&interfaces/Item'
import { useEffect, useState } from 'react'
import getItemById from '../../api/getItemById'
import { useOutletContext } from 'react-router'

interface Props {
  productId: number
  handleCloseDetails: () => void
}

export default function Details() {
  const { productId, handleCloseDetails } = useOutletContext<Props>()
  const [product, setProduct] = useState<Item>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (productId === 0) {
      setError(true)
    } else {
      setLoading(true)
      setError(false)
      getItemById(productId.toString())
        .then((data) => setProduct(data))
        .catch(() => setError(true))
        .finally(() => {
          setLoading(false)
        })
    }
  }, [productId])

  return (
    <div className="details-block">
      <button className="close-button" onClick={() => handleCloseDetails()}>
        X
      </button>
      <div className="content">
        {loading && <p>Loading...</p>}
        {error && <p>Ooops! Something went wrong.</p>}
        {!loading && product && (
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
