import axios from 'axios'

const baseURL = '/api/notes'

const getAll = async () => {
  const response = await axios
    .get(baseURL)
  return response.data
}

const create = async newNote => {
  const response = await axios
    .post(baseURL, newNote)
  return response.data
}

const update = async (id, updatedNote) => {
  const response = await axios
    .put(`${baseURL}/${id}`, updatedNote)
  return response.data
}

export default { getAll, create, update }