import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Filter = ({filterVal, handleFilter}) => {
  return (
    <div>
      filter shwon with <input value={filterVal} onChange={handleFilter} />
  </div>
  )
}

const Form = ({ handleNameChange, handleNumberChange, addPerson, newName, newNumber}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange} 
                />
        </div>
        <div>
          number: <input
                    value = {newNumber}
                    onChange = {handleNumberChange}
                  />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

const Entries = ({filteredEntries}) => {
  return(
    <div>
      {filteredEntries.map(person =>
        <Person key={person.id} person={person} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setNewFilterVal] = useState('')
  const [filteredEntries, setFilteredEntries] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredEntries(response.data)
      })
  }, [])
  
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleFilter = (event) => {
    setNewFilterVal(event.target.value)
    setFilteredEntries((filterVal === '' || filterVal.length < 2) 
      ? persons 
      : persons.filter(person => person.name
          .toLowerCase()
          .includes(filterVal.toLowerCase()))
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    
    const allNames = persons.map(person => person.name)

    if (allNames.includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const newPeople = persons.concat(personObject)
      setPersons(newPeople)
      setFilteredEntries(newPeople)
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