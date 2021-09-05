import axios from "axios";

const url = 'http://localhost:3001/persons'

const getAll = () => {
	return axios.get(url).then(response => response.data)
}

const create = (person) => {
  return axios.post(url, person).then(response => response.data)
}

const deleteById = (id) => {
  return axios.delete(`${url}/${id}`)
}

const update = (id, changedPerson) => {
  return axios.put(`${url}/${id}`, changedPerson).then(response => response.data)
}

export default {getAll, create, deleteById, update}