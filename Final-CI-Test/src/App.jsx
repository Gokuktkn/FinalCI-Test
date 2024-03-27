import './App.css'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import axios from 'axios';
import WeatherInfo from './component/WeatherInfo';
import NotFound from './component/NotFound';

function App() {
  const [inputVal, setInputVal] = useState('');
  const [listData, setListData] = useState({});
  const [found, setFound] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(inputVal)
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=851191d0f7614b39a91d26f7af255bf0`);
        const data = await response.json();
        if (data) {
          setListData(data);
          setFound('yes');
        }
        if (data.message) {
          setFound('no');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };
  const handleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }
  return (
    <div className='body' style={{ backgroundImage: `linear-gradient(1deg, #141313eb, #3d3b3bab), url(${theme === 'light' ? '/public/Img/day.jpg' : '/public/Img/night.jpg'})` }}>
      <div className="content" style={{ backgroundImage: `url(${theme === 'light' ? '/public/Img/day.jpg' : '/public/Img/night.jpg'})` }}>
        <button className='theme-btn' onClick={handleTheme}>{theme === 'light' ? <FaSun className='theme-icon light' /> : <FaMoon className='theme-icon dark' />}</button>
        <form className="search" onSubmit={handleSearch}>
          <input type="text" placeholder='Enter your location' className='search-input' onChange={(e) => setInputVal(e.target.value)} />
          <button className='search-btn'><FaSearch className='search-icon' /></button>
        </form>
        {Object.keys(listData).length > 0 && (found === '' ? '' : found === 'yes' ? <WeatherInfo data={listData} dataTheme={theme} /> : <NotFound />)}
      </div>
    </div>
  )
}

export default App