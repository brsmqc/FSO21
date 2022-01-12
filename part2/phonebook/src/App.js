import React, { useState, useEffect } from 'react'
import phoneServices from './services/phonebook'
import Form from './components/Form'
import Entries from './components/Entries'
import Notification from './components/Notification'

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
  const [message, setMessage] = useState(null)

  useEffect(() => {
    phoneServices
      .getAll()
      .then(initialEntries => {
        setPeople(initialEntries)
        setFilteredEntries(initialEntries)
      })
  }, [])
  
  //Event Handlers
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

  //Main Functions
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    
    const allNames = people.map(person => person.name)

    if (allNames.includes(newName)) {
      const confirmed = window.confirm(`${newName} is already added to the phonebook. Replace the entry that already exists?`)
      if (confirmed) {
        const person = people.find(p => p.name === newName)
        const updatedPerson = {...person, number: newNumber}
        phoneServices
          .update(person.id, updatedPerson)
          .then(returnedEntry => {
            setPeople(people.map(entry => entry.id !== person.id ? entry : returnedEntry))
            setFilteredEntries(filteredEntries.map(entry => entry.id !== person.id ? entry : returnedEntry))
            setMessage(`Changed ${newName}'s number to ${newNumber}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      phoneServices
        .create(personObject)
        .then(returnedEntry => {
          setPeople(people.concat(returnedEntry))
          setFilteredEntries(filteredEntries.concat(returnedEntry))
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }
  
  const removePerson = (person) => {
    const confirmed = window.confirm(`Delete ${person.name} from the phonebook?`)

    if (confirmed) {
    phoneServices
      .remove(person)
      .then((response) => {
        setPeople(people.filter(entry => entry.id !== person.id))
        setFilteredEntries(filteredEntries.filter(entry => entry.id !== person.id))
        setMessage(`Removed ${person.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(`${person.name} has already been removed from the server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPeople(people.filter(entry => entry.id !== person.id))
        setFilteredEntries(filteredEntries.filter(entry => entry.id !== person.id))
      })
    }
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Entries 
        filteredEntries={filteredEntries}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App