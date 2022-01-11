import { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './components/Display'

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
      <Display 
        countries={countries} 
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  )
}

export default App;
