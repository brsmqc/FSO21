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
    const confirmed = window.confirm(`Delete ${person.name} from the phonebook?`)

    if (confirmed) {
        const request = axios.delete(`${baseUrl}/${person.id}`)
        console.log(`${person.id} was deleted from the phonebook`)
        return request.then(response => response.data)
    }

    //If the user clicks cancel, I'm not 100% sure what to do. 
    //The error thrown below doesn't really get picked up by .catch() in App.js.
    //It keeps talling me there's an uncaught error.
    throw new Error('User clicked cancel')

}

export default { getAll, create, remove }