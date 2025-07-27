import { useNavigate } from 'react-router'
import '../../styles/navbar.css'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <button className="nav-button" name="Main" onClick={() => navigate('/')}>
        Main
      </button>
      <button className="back-button" name="About" onClick={() => navigate('/about')}>
        About
      </button>
    </nav>
  )
}
