import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from './Components/filter'
import DisplayCountry from './Components/displayCountry'

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const [filterText, setFilterText] = useState('')
  const [countriesList, setCountries] = useState([])
  const [weather, setWeather] = useState({})
  const [capital, setCapital] = useState('')
  const [hasWeather, setHasWeather] = useState(false)

  const countriesToShow = countriesList.filter(x => x.name.toLowerCase().includes(filterText.toLowerCase()))

  if(countriesToShow.length === 1 && countriesToShow[0].capital !== capital) {
    if(!hasWeather) setHasWeather(true)
    setCapital(countriesToShow[0].capital)
  }

  useEffect(() => axios.get('https://restcountries.eu/rest/v2/all').then(x => setCountries(x.data)), [])
  useEffect(() => axios.get('http://api.weatherstack.com/current', {
    params: {
      access_key: api_key,
      query: capital
    }
  }).then(x => {setWeather(x); console.log('Promise sent')}), [capital])

  return (
    <div>
      <Filter text={filterText} textHandler={setFilterText} />
      <hr />
      <DisplayCountry list={countriesToShow} textHandler={setFilterText} weather={weather} hasWeather={hasWeather}/>
    </div>
  );
}

export default App;
