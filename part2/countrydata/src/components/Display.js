import React from "react"
import CountryDetail from "./CountryDetail"

const Display = ({countries, filter, setFilter}) => {
    //console.log(filter)
    const filteredList = countries.filter(country => 
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    )
    //console.log(filteredList)
    if (filter === "") return(<div>Start typing to find a country.</div>)
    if (filteredList.length > 10) return (<div>Too many matches, specify another filter.</div>)
    if (filteredList.length === 1) {
      //console.log(filteredList)
      return(
        <div>
          <CountryDetail key={filteredList[0].name.common} country={filteredList[0]} />
        </div>
      )
    }
    return(
        <div>
          {filteredList.map(country => 
            <div key={country.name.common}>
                {country.name.common} <button onClick={() => setFilter(country.name.common)}>show</button>
            </div>
          )}
        </div>
    ) 
}

export default Display