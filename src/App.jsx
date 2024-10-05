import React, { useState, useEffect, useMemo} from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import clear from './assets/clear.jpg';
import clouds from './assets/Clouds.jpg';
import rain from './assets/rainy.jpg';
import thunderstorm from './assets/thunderstorm.jpg';
import defau from './assets/default.jpg'; 
import Snowy from './assets/snowy.jpg';
import fog from './assets/fog.jpg';

//preloding images
const preloadImages = [clear, clouds, rain, thunderstorm, defau, Snowy, fog].forEach(src => {
  const img = new Image();
  img.src = src;
});
function App() {
  const [data, setData] = useState({});
  
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
    </div>
  );
}

export default App;
