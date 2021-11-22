import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async content => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

const voteDB = async id => {
  const finded = await axios.get(`${baseUrl}/${id}`)
  const changedAnecdote = { ...finded.data, votes: finded.data.votes + 1 }
  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
  return response.data
}

export default { getAll, createNew, voteDB }
