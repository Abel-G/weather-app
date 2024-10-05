import React from 'react'
import thermometer from '../assets/thermometer.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'
function WeatherCard({ data }) {
  return (
    <div className='max-w-5xl mx-auto px-4 pt-10 relative flex lg:flex-row flex-col md:flex-col gap-10 justify-between overflow-hidden' >
      <div className='w-full mx-auto bg-white/40 px-4  rounded-2xl flex justify-between'>
        <div>
          <div className='location'>
            <p className='text-3xl'>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1 className='text-6xl'>{data.main.temp.toFixed(1)}°C</h1> : null}
          </div>
          <div className='position:relative'>
            {data.weather ? <p className='text-3xl'>{data.weather[0].main}</p> : null}
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
        <div className='flex justify-between w-full mx-auto px-4 py-4 rounded-2xl bg-white/40 text-center z-10'>
          <div className='feels'>
            <img src={thermometer} alt="thermometer" className='w-10 brightness-0 invert'/>
            <div>
              <p>Feels Like</p>
              {data.main ? <p className='desc'>{data.main.feels_like.toFixed(1)}°C</p> : null}
            </div>
          </div>
          <div className='humidity'>
            <div>
              <img src={humidity} alt="" className='w-10 brightness-0 invert'/>
              <p>Humidity</p>
              {data.main ? <p className='desc'>{data.main.humidity}%</p> : null}
            </div>
          </div>
          <div className='wind'>
            <div>
              <img src={wind} alt="wind" className='w-10 brightness-0 invert'/>
              <p>Wind Speed</p>
              {data.wind ? <p className='desc'>{data.wind.speed.toFixed()} MPH</p> : null}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherCard