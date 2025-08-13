'use client'
import { useContext, type SyntheticEvent } from 'react'
import '../../styles/card.css'
import { useDispatch } from 'react-redux'
import { addItem, deleteItem } from '../../features/selectedItemsList/selectedItemsListSlice'
import type { CardProps } from '../../types&interfaces/CardProps'
import { SearchResultContext } from './SearchResultContext'

export default function ProductCard(props: CardProps) {
  const context = useContext(SearchResultContext)
  const dispatch = useDispatch()
  const { data } = props

  const className = props.active ? 'result-card active' : 'result-card'
  if (!data || !context) return <p>Something went wrong</p>

  const handleClick = (event: SyntheticEvent) => {
    const target = event.target as HTMLElement

    if (target.tagName !== 'INPUT' && target.tagName !== 'LABEL') {
      context.handleOpenDetails(data.id)
    }
  }

  const handleChange = (event: SyntheticEvent) => {
    event.stopPropagation()

    if (!props.checked) {
      dispatch(addItem(data))
    } else {
      dispatch(deleteItem(data))
    }
  }

  return (
    <div className={className} onClick={handleClick} data-testid={'card'}>
      <img
        src={data.images[0] || 'assets/image-placeholder.png'}
        alt="product-image"
        width={100}
        height={100}
      />
      <div>{data.title}</div>
      <label className="checkbox-label">
        <input
          className="card-checkbox"
          type="checkbox"
          onChange={handleChange}
          checked={props.checked}
        ></input>
        Add to list
      </label>
    </div>
  )
}
