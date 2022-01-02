import axios from "axios"

const baseUrl = "/api/blogs"

let token = ""

export const setToken = newToken => {
  token = "bearer " + newToken
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const modify = async toModify => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(
    `${baseUrl}/${toModify.id}`,
    toModify,
    config
  )
  return response.data
}
const exported = { setToken, getAll, addBlog, modify }
export default exported
