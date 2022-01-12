import Person from "./Person"

const Entries = ({filteredEntries, removePerson}) => {
  return(
    <div>
      {filteredEntries.map(person =>
        <Person 
          key={person.id}
          person={person} 
          removePerson={() => removePerson(person)}
        />
      )}
    </div>
  )
}

export default Entries