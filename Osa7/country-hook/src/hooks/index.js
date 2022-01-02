import { useState, useEffect } from "react"
import axios from "axios"
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

export const useCountry = name => {
  const [country, setCountry] = useState(null)

  const findCountry = async name => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${name}?fullText=true`
      )
      const info = { ...response.data[0], found: true }
      setCountry(info)
    } catch (error) {
      setCountry({ found: false })
    }
  }

  useEffect(() => {
    if (name != "") {
      findCountry(name)
    }
  }, [name])

  return country
}
