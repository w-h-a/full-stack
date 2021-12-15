import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll =
    () => {
        const request = axios.get(baseUrl)
        return request.then(response => response.data)
    }

const postNew =
    person => {
        const request = axios.post(baseUrl, person)
        return request.then(response => response.data)
    }

const deletePerson =
    person => {
        const request = axios.delete(`${baseUrl}/${person.id}`)
        return request.then(response => response.data)
    }

const putNum =
    person => {
        const request = axios.put(`${baseUrl}/${person.id}`, person)
        return request.then(response => response.data)
    }

const personService = { getAll, postNew, deletePerson, putNum }

export default personService
