import React from 'react'
import { FaTemperatureQuarter } from "react-icons/fa6";
import { PiWind } from "react-icons/pi";

const WeatherInfo = ({ data, dataTheme }) => {
    const themeOfPage = dataTheme === 'light' ? '' : '#fff';
    return (
        <div className='weather' style={{color: `${themeOfPage}`}}>
            <h1 className='city-name'>{data?.name}, {data?.sys.country}</h1>
            <img src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} alt="Weather icon" className='weather-img' />
            <div className="weather-info">
                <h2 className="status">{data?.weather[0].main}</h2>
                <div className="more">
                    <div className="temperature">
                        <FaTemperatureQuarter />
                        <span>{Math.round((data?.main.temp - 273.15))} <sup>o</sup>C</span>
                    </div>
                    <div className="wind">
                        <PiWind />
                        <span>{data?.wind.speed} (m/s)</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherInfo
