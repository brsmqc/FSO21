import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  return(
    <div>
      {country.name.common}
    </div>
  )
}

const Display = ({countries, filter}) => {
  const filteredList = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  if (filter === "") return(<div>Start typing to find a country.</div>)
  if (filteredList.length > 10) return (<div>Too many matches, specify another filter.</div>)

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
        console.log(response.data)
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
