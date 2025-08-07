import '../../styles/pagination.css'
interface Props {
  pages: number
  onChangePage: (page: number) => void
  activePage: number
}

export default function PaginationButtons(props: Props) {
  const createButtons = (count: number) => {
    const arrayOfButtons = []
    for (let i = 0; i < count; i++) {
      let className = 'pagination-button'

      if (i + 1 === props.activePage) {
        className = `${className}-active`
      }

      if (i < props.activePage + 2 && i >= props.activePage - 3) {
        arrayOfButtons.push(
          <button className={`${className}`} key={i} onClick={() => props.onChangePage(i + 1)}>
            {i + 1}
          </button>,
        )
      }
    }
    return arrayOfButtons
  }
  return (
    <div className="pagination">
      {props.activePage - 2 > 1 && <div className="pagination-hidden">&lt;</div>}
      {createButtons(props.pages)}
      {props.activePage + 2 < props.pages && <div className="pagination-hidden">&gt;</div>}
    </div>
  )
}
