import axios from "axios"

const baseUrl = 'http://localhost:3001/people'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = (person) => {
    const controller = new AbortController()
    const confirmed = window.confirm(`Delete ${person.name} from the phonebook?`)

    if (confirmed) {
        const request = axios.delete(`${baseUrl}/${person.id}`)
        console.log(`${person.id} was deleted from the phonebook`)
        return request.then(response => response.data)
    }
    
    throw 'User clicked cancel'

}

export default { getAll, create, remove }