import React from 'react'
const DisplayWeather = ({weather, hasWeather}) => {
    if(!hasWeather) {
      return (
        <></>
      )
    }
    if(typeof weather.data.success !== 'undefined') {
      return (
        <></>
      )
    }
    else {
      return (
        <div>
          <b>Sää kaupungissa {weather.data.location.name}</b>
          <p>Nyt on {weather.data.current.temperature} astetta</p>
          <p>Tuntuu kuin {weather.data.current.feelslike}</p>
          <img src={weather.data.current.weather_icons[0]} />
          <p><b>Tuuli:</b> {weather.data.current.wind_speed} mph</p>
        </div>
      )
    }
}
export default DisplayWeather