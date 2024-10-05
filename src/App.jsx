import React, { useState, useEffect, useMemo} from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import clear from './assets/clear.jpg';
import clouds from './assets/clouds.jpg';
import rain from './assets/rainy.jpg';
import thunderstorm from './assets/thunderstorm.jpg';
import defau from './assets/default.jpg'; 
import Snowy from './assets/Snowy.jpg';
import fog from './assets/fog.jpg';
//preloding images
const preloadImages = [clear, clouds, rain, thunderstorm, defau, Snowy, fog].forEach(src => {
  const img = new Image();
  img.src = src;
});
  /**
   * App component that fetches weather data for a given location and displays it in a WeatherCard.
   * It also renders a SearchBar component to allow the user to input a new location.
   * The background image of the app depends on the current weather condition.
*/
function App() {
  const [data, setData] = useState({});
  
  /**
   * Fetches weather data from the OpenWeatherMap API for a given location.
   * If the location is not valid, an alert is shown and nothing else is done.
   * If the API call fails (e.g. because the API key is invalid), an error is logged to the console.
   * If the API call succeeds, the weather data is stored in the component state and logged to the console.
   */
  const fetchWeatherData = (location) => {
    if(!location){
      alert('Please enter correct city name');
      return;
  }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          alert("City not found");
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
  /**
   * Resets the app by clearing the weather data and input field.
   * Used to provide a "Reset" button.
   */
  const reset = () => {
    setData(false); // Clear weather data
    inputRef.current.value = ''; // Clear input field
}

  // Memoize the background image computation to avoid unnecessary recalculations
  const getBackgroundImage = useMemo(() => {
    if (!data.weather) return '';
    switch (data.weather[0].main) {
      case 'Clouds':
        return `url(${clouds})`;
      case 'Clear':
        return `url(${clear})`;
      case 'Rain':
        return `url(${rain})`;
      case 'Snow':
        return `url(${Snowy})`;
      case 'Thunderstorm':
        return `url(${thunderstorm})`;
      case 'Fog':
        return `url(${fog})`;
      default:
        return `url(${defau})`;
    }
  }, [data.weather]);
  
  return (
    <div className='app'style={{ backgroundImage: getBackgroundImage, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
      <SearchBar onSearch={fetchWeatherData} />
      <WeatherCard data={data} />
      <button className='fixed bottom-3 left-1/2 transform -translate-x-1/2 bg-white/60 text-gray-800 py-1 px-6 rounded-full shadow-lg hover:bg-gray-600/30 hover:text-white focus:outline-none' onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
