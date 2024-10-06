import React, { useState, useEffect } from 'react';

/**
 * Forecast component fetches and displays the 5-day weather forecast for a given location.
 * It includes both the logic to fetch the forecast data and the UI to display it.
 */
function Forecast({ location }) {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if (location) {
      fetchForecastData(location);
    }
  }, [location]);
  
  /**
   * Fetches the 5-day forecast data from the OpenWeather API based on the given location.
   */
  const fetchForecastData = (location) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Filter to get a forecast for every day at noon
        const dailyForecasts = data.list.filter((reading) => reading.dt_txt.includes("12:00:00"));
        setForecastData(dailyForecasts);
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
  };
/**
   * Resets the forecast data.
   */
const resetForecast = () => {
    setForecastData([]);
    if (onReset) onReset(); // Call the reset function passed as a prop
  };

  /**
   * Refreshes the forecast data based on the current location.
   */
  const refreshForecast = () => {
    fetchForecastData(location);
    if (onRefresh) onRefresh(); // Call the refresh function passed as a prop
  };
  /**
   * Renders a forecast card for each day in the forecast data.
   */
  return (
    <div className='forecast-container mt-10 px-2 md:flex md:flex-col sm:grid sm:grid-cols-1 sm:gap-4'>
      <h2 className='text-2xl font-bold mb-4'>5-Day Forecast</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4'>
        {forecastData.map((forecast, index) => {
          const date = new Date(forecast.dt * 1000);
          const day = date.toLocaleDateString('en-US', { weekday: 'long' });
          const temp = forecast.main.temp.toFixed(1);
          const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

          return (
            <div key={index} className='forecast-card p-4 bg-white/40 rounded-2xl text-center'>
              <p className='text-lg font-bold'>{day}</p>
              <img src={iconUrl} alt={forecast.weather[0].description} className='w-16 mx-auto' />
              <p className='text-xl'>{temp}°C</p>
              <p>{forecast.weather[0].main}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
