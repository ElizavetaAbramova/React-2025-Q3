// import { useState } from 'react'
import './styles/search.css'
import './App.css'

function App() {
  return (
    <>
      <h1>What do you want to find?</h1>
      <div className="search-bar">
        <input className="search-input" placeholder="ex.: bananas"></input>
        <button className="search-button">Search</button>
      </div>
      <div className="results-block">
        <div className="result-card"></div>
      </div>
    </>
  )
}

export default App
