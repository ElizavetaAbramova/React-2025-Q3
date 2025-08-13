'use client'
import type { Item } from '../../types&interfaces/Item'
import '../../styles/selected-items-flyout-block.css'
import { useDispatch } from 'react-redux'
import { clearList } from '../../features/selectedItemsList/selectedItemsListSlice'

interface Props {
  list: Item[]
}

export default function SelectedItemsFlyout(props: Props) {
  const dispatch = useDispatch()
  const downloadList = async () => {
    if (props.list.length !== 0) {
      const response = await fetch('/api/download-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ list: props.list }),
      })

      if (!response.ok) {
        console.error('Failed to download CSV')
        return
      }

      const file = await response.blob()
      const url = URL.createObjectURL(file)
      const element = document.createElement('a')
      element.href = url
      element.download = `${props.list.length}_items.csv`
      document.body.appendChild(element)
      element.click()
      element.remove()
    }
  }

  return (
    <div className="shopping-list-control-block">
      <p>Selected {props.list.length} item(s)</p>
      <button onClick={downloadList} name="download">
        Download shopping list
      </button>
      <button onClick={() => dispatch(clearList())} name="clear">
        Clear list
      </button>
    </div>
  )
}
