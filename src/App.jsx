import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar'

function App() {
  
  return (
    <div className="App">
      <SearchBar /> 
      <WeatherCard />
    </div>
  )
}

export default App
