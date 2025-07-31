import type { Item } from '../../types&interfaces/Item'
import '../../styles/shopping-list-block.css'
import { useDispatch } from 'react-redux'
import { clearList } from '../../features/shoppingList/shoppingListSlice'

interface Props {
  list: Item[]
}

export default function ShoppingList(props: Props) {
  const dispatch = useDispatch()
  const downloadList = () => {
    if (props.list.length !== 0) {
      const headers: (keyof Item)[] = [
        'id',
        'title',
        'description',
        'images',
        'availabilityStatus',
        'brand',
        'price',
      ]

      const csvRows = []
      csvRows.push(headers.join(','))
      for (const item of props.list) {
        const row = headers.map((header) => `"${item[header]}"`)
        csvRows.push(row.join(','))
      }

      const csvFile = csvRows.join('\n')
      const file = new File([csvFile], `${props.list.length}_items.csv`, { type: 'text/csv' })
      const url = URL.createObjectURL(file)
      const element = document.createElement('a')
      element.href = url
      element.download = `${props.list.length}_items.csv`
      document.body.appendChild(element)
      element.click()
    }
    console.log(props.list)
  }
  return (
    <div className="shopping-list-control-block">
      <p>Selected {props.list.length} item(s)</p>
      <button onClick={downloadList}>Download shopping list</button>
      <button onClick={() => dispatch(clearList())}>Clear list</button>
    </div>
  )
}
