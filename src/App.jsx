import React, { useState, useRef, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import clear from './assets/clear.jpg';
import clouds from './assets/clouds.jpg';
import rain from './assets/rainy.jpg';
import thunderstorm from './assets/thunderstorm.jpg';
import defau from './assets/default.jpg'; 
import Snowy from './assets/Snowy.jpg';
import fog from './assets/fog.jpg';
import ErrorMessage  from './components/ErrorMessages';
import Forecast from './components/Forecast';   
//preloading images
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
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef();

  /**
   * Fetches weather data from the OpenWeatherMap API for a given location.
   * If the location is not valid, an alert is shown and nothing else is done.
   * If the API call fails (e.g. because the API key is invalid), an error is logged to the console.
   * If the API call succeeds, the weather data is stored in the component state and logged to the console.
   */
  const fetchWeatherData = (location) => {
    if (!location) {
      setErrorMessage('Please enter a correct city name');
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          setErrorMessage("City not found");;
          throw new Error("Error fetching weather data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setErrorMessage('');
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
    setData(false);
    // Clear weather data
    inputRef.current.value = ''; // Clear input field
    
  };

  /**
   * Fetches the latest weather data based on the current location in the input field
   * without triggering any alerts.
   */
  const refreshWeather = () => {
    const location = inputRef.current.value;
    if (location) {
      fetchWeatherData(location); // Refresh weather without validation
    }
  };

  // Memoize the background image computation to avoid unnecessary recalculations
  const getBackgroundImage = useMemo(() => {
    if (!data.weather) return '';
  
        const weatherImages = {
            Clouds: `url(${clouds})`,
            Clear: `url(${clear})`,
            Rain: `url(${rain})`,
            Snow: `url(${Snowy})`,
            Thunderstorm: `url(${thunderstorm})`,
            Fog: `url(${fog})`,
            default: `url(${defau})`,
          };     
            return data.weather.map((item) => weatherImages[item.main] || weatherImages.default);
        
  }, [data.weather]);
//  


  return (
    <div className='app' style={{ backgroundImage: getBackgroundImage, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      <div className='relative z-10'>
        <SearchBar onSearch={fetchWeatherData} inputRef={inputRef} />
        <WeatherCard data={data} />
        <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} /> 
        {data.name && <Forecast location={data.name} />} {/* Only render if we have a valid location */}
        <div className="button-group fixed bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-4 items-center">
          <button className='bg-white/60 text-gray-800 py-1 px-6 rounded-full shadow-lg hover:bg-gray-600/30 hover:text-white focus:outline-none' onClick={reset}>Reset</button>
          <button className='bg-white/60 text-gray-800 py-1 px-6 rounded-full shadow-lg hover:bg-gray-600/30 hover:text-white focus:outline-none' onClick={refreshWeather}>Refresh</button>
          <p className='text-sm ml-auto'>© 2024 By <a href='https://github.com/Abel-G' className='hover:text-red-400'>Abel-G</a></p>
        </div>
      </div>
    </div>
  );
}

export default App;
