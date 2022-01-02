import axios from "axios"
import { useState, useEffect } from "react"

export const useField = type => {
  const [value, setValue] = useState("")

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then(res => setResources(res.data))
  }, [])

  const create = resource => {
    axios
      .post(baseUrl, resource)
      .then(res => setResources(resources.concat(res.data)))
  }

  const service = {
    create,
  }

  return [resources, service]
}
