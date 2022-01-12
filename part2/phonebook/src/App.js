import React, { useState, useEffect } from 'react'
import axios from 'axios'
import phoneServices from './services/phonebook'
import Form from './components/Form'
import Entries from './components/Entries'

const Filter = ({filterVal, handleFilter}) => {
  return (
    <div>
      filter shwon with <input value={filterVal} onChange={handleFilter} />
  </div>
  )
}

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setNewFilterVal] = useState('')
  const [filteredEntries, setFilteredEntries] = useState(people)

  useEffect(() => {
    phoneServices
      .getAll()
      .then(initialEntries => {
        setPeople(initialEntries)
        setFilteredEntries(initialEntries)
      })
  }, [])
  
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleFilter = (event) => {
    setNewFilterVal(event.target.value)
    setFilteredEntries((filterVal === '' || filterVal.length < 2) 
      ? people 
      : people.filter(person => person.name
          .toLowerCase()
          .includes(filterVal.toLowerCase()))
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    
    const allNames = people.map(person => person.name)

    if (allNames.includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      phoneServices
        .create(personObject)
        .then(returnedEntry => {
          setPeople(people.concat(returnedEntry))
        })
    }

    setNewName('')
    setNewNumber('')
  }
  
  return(
    <div>
      <h2>Phonebook</h2>
      <Filter filterVal={filterVal} handleFilter={handleFilter} />
      <h3>Add a new entry</h3>
      <Form 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Entries filteredEntries={filteredEntries} />
    </div>
  )
}

export default App