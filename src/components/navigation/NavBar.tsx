import { useNavigate } from 'react-router'
import '../../styles/navbar.css'
import ThemeSwitcher from '../themeToggle/ThemeToggle'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <button className="nav-button" name="Main" onClick={() => navigate('/')}>
        Main
      </button>
      <button className="nav-button" name="About" onClick={() => navigate('/about')}>
        About
      </button>
      <ThemeSwitcher></ThemeSwitcher>
    </nav>
  )
}
