import '../../styles/pagination.css'
interface Props {
  pages: number
  onChangePage: (page: number) => void
  activePage: number
}

export default function Pagination(props: Props) {
  const createButtons = (count: number) => {
    const arrayOfButtons = []
    for (let i = 0; i < count; i++) {
      if (i + 1 === props.activePage) {
        arrayOfButtons.push(
          <button
            className="pagination-button-active"
            key={i}
            onClick={() => props.onChangePage(i + 1)}
          >
            {i + 1}
          </button>,
        )
      } else if (props.activePage + 2 > i && props.activePage - 2 <= i + 1) {
        arrayOfButtons.push(
          <button className="pagination-button" key={i} onClick={() => props.onChangePage(i + 1)}>
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
