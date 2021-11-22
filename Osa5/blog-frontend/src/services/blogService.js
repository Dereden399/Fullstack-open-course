import axios from "axios"

const baseUrl = "/api/blogs"

let token = ""

const setToken = newToken => {
  token = "bearer " + newToken
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const add = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, add, update, setToken, deleteBlog }
