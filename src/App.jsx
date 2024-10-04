import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar'

function App() {
  const [data, setData] = useState({});
  
  const fetchWeatherData = (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching weather data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };
  return (
    <div className="App">
      <SearchBar /> 
      <WeatherCard />
    </div>
  )
}

export default App
