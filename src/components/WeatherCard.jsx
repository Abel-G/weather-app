import React from 'react'

function WeatherCard({ data }) {
  return (
    <div className='max-w-3xl mx-auto px-4 pt-10 relative flex  gap-10 justify-between overflow-hidden' >
      <div className='w-full mx-auto bg-white/20 px-4 py-0 rounded-2xl flex justify-between'>
        <div>
          <div className='location'>
            <p className='text-3xl'>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1 className='text-6xl'>{data.main.temp.toFixed(1)}°C</h1> : null}
          </div>
          <div className='position:relative'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.weather && (
          <img
            src={`/icons/${data.weather[0].icon}.png`}
            alt="Weather Icon"
            className='icon w-150 '
          />
        )}
      </div>
      {data.name !== undefined && (
        <div className='flex justify-between w-full mx-auto px-4 py-4 rounded-2xl bg-white/20 text-center z-10'>
          <div className='feels'>
            {data.main ? <p className='desc'>{data.main.feels_like.toFixed(1)} °F</p> : null}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='desc'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.wind ? <p className='desc'>{data.wind.speed.toFixed()} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherCard