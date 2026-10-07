import { useEffect, useState } from 'react'
import axios from 'axios'
import Searchbar from './Components/searchbar/searchbar.jsx'
import CountryList from './Components/list/list.jsx'
import Spotlight from './Components/spotlight/spotlight.jsx'
import Weather from './Components/weather/weather.jsx'


function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [display, setDisplay] = useState(null)
  const [weather, setWeather] = useState(null)

  const handleChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  useEffect(() => {
        axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
            setCountries(response.data)
        })

    }, [])

  const handleClick = (country) => {
    const lat = country.latlng[0]
    const lon = country.latlng[1]
    const apiKey = import.meta.env.VITE_SOME_KEY
    console.log(country.name.common)
    setDisplay(country)
    axios
      .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    ) 
      .then(response => {
        setWeather(response.data)
      })
  }
  
  return (
    <div>
      <Searchbar filter={filter} handleChange={handleChange}/>
      <CountryList
          countries={countries}
          filter={filter}
          handleClick={handleClick}
      />
      <Spotlight
        display={display}
      />
      <Weather
        weather={weather}
      />
    </div>
  )
}

export default App

