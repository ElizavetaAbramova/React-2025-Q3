import { useNavigate } from 'react-router'
import '../styles/page-404.css'

export default function Page404() {
  const navigate = useNavigate()
  return (
    <div className="page-404">
      <img
        src="./assets/404.png"
        width={200}
        height={200}
        className="image-404"
        alt="page-not-found image"
      ></img>
      <h3>Page not found. Incorrect URL or page does not exist anymore.</h3>
      <button className="back-button" onClick={() => navigate('/')}>
        Back to home page
      </button>
    </div>
  )
}
