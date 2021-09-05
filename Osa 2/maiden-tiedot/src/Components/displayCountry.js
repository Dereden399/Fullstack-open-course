import React from 'react'
import DisplayWeather from './displayWeather'
const DisplayCountry = ({list, textHandler, weather, hasWeather}) => {
    const len = list.length
    if(len > 10) {
      return (
        <p>Liian paljon maita. Kirjoita enemmän!</p>
      )
    } 
    if(len > 1) {
      return (
        list.map((x, i) => <p key={i}>{x.name} <button onClick={() => textHandler(x.name)}>Näytä</button></p>)
      )
    }
    if(len === 1) {
      const country = list[0]
      return (
        <div className='Country'>
          <h1>{country.name}</h1>
          <h3>{country.nativeName}</h3>
          <p>Pääkaupunki: {country.capital}</p>
          <p>Asutusmäärä: {country.population}</p>
          <p>Kielet:</p>
          <ul>
            {country.languages.map((x, i) => <li key={i}>{x.name}</li>)}
          </ul>
          <img src={country.flag} width='216' height='132' border='2'/>
          <hr/>
          <DisplayWeather weather={weather} hasWeather={hasWeather}/>
        </div>
      )
    }
    return (
      <b>Maailmassa ei ole sellaista maata!</b>
    )
}
export default DisplayCountry