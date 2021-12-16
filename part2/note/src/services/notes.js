import axios from 'axios'

const baseUrl = '/api/notes'

const getAll =
    () => {
      const request = axios.get(baseUrl)
      return request.then(response => response.data)
    }

const postNew =
    newObject => {
        const request = axios.post(baseUrl, newObject)
        return request.then(response => response.data)
    }

const putImportance =
    (id, newObject) => {
        const request = axios.put(`${baseUrl}/${id}`, newObject)
        return request.then(response => response.data)
    }

const noteService = { getAll, postNew, putImportance }

export default noteService
