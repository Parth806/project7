import React, { useState } from 'react'
import './App.css'
const API_KEY = `733e617ac552f98bf77f123b53cba756`

export default function App() {
  const[city,setCity]=useState("");
  const[weather,setWeather]=useState(null);
  const[error,setError]=useState("");

  const getWeather=async()=>{
    if(!city){
      setError("Please enter a city name");
      return;
    }

    try{
      setError("");
      const response=await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if(!response.ok){
        throw new Error("City not found");
      }
      const data=await response.json();
      setWeather(data);
    }catch(err){
      setError(err.message);
      setWeather(null);
    }

}
  return (
   <div>
      <div className='header'>
        <h1>Weather App</h1>
      </div>
      <div className='section'>
        <div className='search'>
          <input type="text" placeholder='Enter city name' value={city} onChange={(e)=>setCity(e.target.value)} required/>
          <button type='submit' placeholder='submit' onClick={getWeather}>Search</button>
        </div>
          {error && <p className='error'>{error}</p>}
          {weather &&(
        <div className='weather-card'>
          <h2>{weather?.name}</h2>
          <p>temperature: {weather.main.temp}°C</p>
          <p>humidity: {weather.main.humidity}%</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
          )}
      </div>
      <div className='footer'>
        <p>copyright.@ Kharkar Parth Prasad</p>
      </div>
    </div>
  )
}