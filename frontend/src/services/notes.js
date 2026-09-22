import axios from 'axios'

const baseURL = '/api/notes'

const getAll = () => {
  return axios
    .get(baseURL)
    .then(response => response.data)
}

const create = newNote => {
  return axios
    .post(baseURL, newNote)
    .then(response => response.data)
}

const update = (id, updatedNote) => {
  return axios
    .put(`${baseURL}/${id}`, updatedNote)
    .then(response => response.data)
}

export default { getAll, create, update }