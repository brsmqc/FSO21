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

  export default Form