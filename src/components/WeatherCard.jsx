import React from 'react'

function WeatherCard({ data }) {
  return (
    <div className=''>
      <div className='flex flex-col'>
          {data.weather && (
              <img
                src={`/icons/${data.weather[0].icon}.png`}
                alt="Weather Icon"
                className='icon w-10'
              />
            )}
          <div>
            {data.main ? <h1>{data.main.temp}°C</h1> : null}
          </div>
          <div> 
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
      </div>    
      <div className='flex'>
        <div>
          <div>
            <h1>{data.name}</h1>
          </div>
          <div>
            <h3>Monday, 20 January</h3> 
          </div>
        </div>
        <div className=''>
          <div>
            <h3>Feels Like</h3>
            <h3>16°</h3>
            <img src="" alt="" />
          </div>
          <div>
            <h3>Wind</h3>
            <h3>10 km/h</h3>
            <img src="" alt="" />
          </div>
          <div>
            <h3>Humidity</h3>
            <h3>15%</h3>
            <img src="" alt="" />
          </div>
          <div>
            <h3>Rain</h3>
            <h3>N/A</h3>
            <img src="" alt="" />
          </div>
        </div>
      </div>  
    </div>
  )
}

export default WeatherCard