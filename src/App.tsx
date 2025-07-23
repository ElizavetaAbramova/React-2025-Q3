import './App.css'
import Navbar from './components/navigation/NavBar'
import { Outlet } from 'react-router'

function App() {
  return (
    <div className="app">
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default App
