import './App.css'
import Navbar from './components/navigation/NavBar'
import { Outlet } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/store'
import ThemeProvider from './features/theme/themeProvider'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className="app">
          <header>
            <Navbar></Navbar>
          </header>
          <main>
            <Outlet></Outlet>
          </main>
        </div>
      </ThemeProvider>
    </Provider>
  )
}

export default App
