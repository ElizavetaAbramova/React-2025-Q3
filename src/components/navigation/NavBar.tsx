import { useNavigate } from 'react-router'
import '../../styles/navbar.css'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <button className="nav-button" onClick={() => navigate('/')}>
        Main
      </button>
      <button className="back-button" onClick={() => navigate('/about')}>
        About
      </button>
    </nav>
  )
}
