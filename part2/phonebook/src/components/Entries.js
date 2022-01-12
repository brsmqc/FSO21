import Person from "./Person"

const Entries = ({filteredEntries}) => {
    return(
      <div>
        {filteredEntries.map(person =>
          <Person key={person.id} person={person} />
        )}
      </div>
    )
}

export default Entries