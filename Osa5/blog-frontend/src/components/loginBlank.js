import React, { useState } from "react"
import PropTypes from "prop-types"

const LoginBlank = ({ handleLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const login = async event => {
    event.preventDefault()
    await handleLogin({ username, password })
    setUsername("")
    setPassword("")
  }

  return (
    <form
      onSubmit={event => {
        login(event)
      }}
    >
      <div>
        Username
        <input
          id='username'
          type='text'
          name='Username'
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div>
        Password
        <input
          id='password'
          type='password'
          name='Password'
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )
}

LoginBlank.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginBlank
