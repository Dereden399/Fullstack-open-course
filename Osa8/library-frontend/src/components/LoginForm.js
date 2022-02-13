import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LOGIN } from "../queries"
import { useMutation } from "@apollo/client"

const LoginForm = ({ token, setToken }) => {
  const nav = useNavigate()
  const [sendLogin, result] = useMutation(LOGIN, {
    onError: error => window.alert(error.message),
  })
  useEffect(() => {
    if (result.data) {
      const newToken = result.data.login.value
      localStorage.setItem("token", newToken)
      setToken(newToken)
      nav("/books")
    }
  }, [result.data])
  const login = async e => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    sendLogin({ variables: { username, password } })
    e.target.username.value = ""
    e.target.password.value = ""
  }
  if (token) return <div>Logged in already</div>
  return (
    <div>
      <form onSubmit={login}>
        <div>
          <input placeholder='Username...' minLength='4' name='username' />
        </div>
        <div>
          <input placeholder='Password...' type='password' name='password' />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
