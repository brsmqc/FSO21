import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Barry Still', number: '21-99986-6863', id: 1},
    {name: 'Kimberly Still', number: '21-99884-3880', id: 2},
    {name: 'Larry Still', number: '+1 417-359-4117', id: 3},
    {name: 'Paul Thomas', number: '+1 618-792-5529', id: 4},
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setNewFilterVal] = useState('')
  const [filteredEntries, setFilteredEntries] = useState(persons)

  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleFilter = (event) => {
    setNewFilterVal(event.target.value)
    setFilteredEntries((filterVal === '') 
      ? persons 
      : persons.filter(person => person.name.toLowerCase().includes(filterVal.toLowerCase()))
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
        <div>
          filter shwon with <input value={filterVal} onChange={handleFilter} />
        </div>
      <h3>Add a new entry</h3>
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
      <h2>Numbers</h2>
        {filteredEntries.map(person =>
          <Person key={person.id} person={person} />
        )}
    </div>
  )
}

export default App