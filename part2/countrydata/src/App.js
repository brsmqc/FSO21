import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  return(
    <div>
      {country.name.common}
    </div>
  )
}

const CountryDetail = ({country}) => {
  //console.log(country)
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
    </div>
  )
}

const Display = ({countries, filter}) => {
  const filteredList = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )
  //console.log(filteredList)
  if (filter === "") return(<div>Start typing to find a country.</div>)
  if (filteredList.length > 10) return (<div>Too many matches, specify another filter.</div>)
  if (filteredList.length === 1) {
    return(
      <div>
        <CountryDetail key={filteredList[0].name.common} country={filteredList[0]} />
      </div>
    )
  }
  return(
      <div>
        {filteredList.map(country =>
          <Country key={country.name.common} country={country} />  
        )}
      </div>
  ) 
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data)
        //console.log(response.data)
      })
  }, [])
  
  return (
    <div>
      find countries <input value={filter} onChange={handleFilter} />
      <Display countries={countries} filter={filter} />
    </div>
  )
}

export default App;
