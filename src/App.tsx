import './App.css'
import ErrorBoundary from './components/errorBoundary/ErrorBoundary'
import MainPage from './pages/MainPage'

function App() {
  return (
    <>
      <ErrorBoundary fallback={<p>Unexpected error</p>}>
        <MainPage></MainPage>
      </ErrorBoundary>
    </>
  )
}

export default App
