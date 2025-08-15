'use client'
import { useContext, type SyntheticEvent } from 'react'
import '../../styles/card.css'
import { useDispatch } from 'react-redux'
import { addItem, deleteItem } from '../../features/selectedItemsList/selectedItemsListSlice'
import type { CardProps } from '../../types&interfaces/CardProps'
import { SearchResultContext } from './SearchResultContext'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useRouter } from '../../i18n/navigation'

export default function ProductCard(props: CardProps) {
  const router = useRouter()
  const context = useContext(SearchResultContext)
  const dispatch = useDispatch()
  const t = useTranslations('main')
  const { data } = props

  const className = props.active ? 'result-card active' : 'result-card'
  if (!data || !context) return <p>Something went wrong</p>

  const handleClick = (event: SyntheticEvent) => {
    const target = event.target as HTMLElement

    if (target.tagName !== 'INPUT' && target.tagName !== 'LABEL') {
      router.push({ pathname: '/productId/[id]', params: { id: data.id } })
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
      <Image
        src={data.images[0] || '/assets/image-placeholder.png'}
        alt="product-image"
        width={100}
        height={100}
        priority={true}
      ></Image>
      <div>{data.title}</div>
      <label className="checkbox-label">
        <input
          className="card-checkbox"
          type="checkbox"
          onChange={handleChange}
          checked={props.checked}
        ></input>
        {t('add-to-list')}
      </label>
    </div>
  )
}
