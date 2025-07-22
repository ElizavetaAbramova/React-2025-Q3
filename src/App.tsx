import { Link, Route, Routes } from 'react-router'
import './App.css'
import MainPage from './pages/MainPage'
import AboutPage from './pages/AboutPage'
import Page404 from './pages/Page404'

function Navbar() {
  return (
    <nav>
      <Link to="/">Main</Link>
      <Link to="/about">About</Link>
      <Link to="*">404</Link>
    </nav>
  )
}

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>} />
        <Route path="/about" element={<AboutPage></AboutPage>} />
        {/* <Route path="/users/:id" element={<UserPage />} /> */}

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  )
}

export default App
