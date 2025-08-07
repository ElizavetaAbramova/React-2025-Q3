import './App.css'
import Navbar from './components/navigation/NavBar'
import { Outlet } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header>
          <Navbar></Navbar>
        </header>
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </Provider>
  )
}

export default App
