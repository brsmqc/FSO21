import { useState, useEffect } from "react"
import axios from "axios"
import Weather from "./Weather"

const CountryDetail = ({country}) => {
    //console.log(country)
    const [weather, setWeather] = useState({})

    useEffect(() => {
        const apiKey = process.env.REACT_APP_API_KEY
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${apiKey}`)
            .then(response => {
                //console.log(response.data)
                setWeather(response.data)})
    },[country])

    return(
      <div>
        <h1>{country.name.common}</h1>
        <div>
          capital: {country.capital[0]}
        </div>
        <div>
          population: {country.population.toLocaleString()}
        </div>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map(lang =>
            <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} alt={`The flag of ${country.name.common}`} />
        <Weather country={country} weather={weather} />
      </div>
    )
}

export default CountryDetail