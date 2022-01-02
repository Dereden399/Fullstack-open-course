import React from "react"
import { login } from "../reducers/userReducer"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

const LoginBlank = ({ user, login }) => {
  if (user.username && user.username !== "") {
    return <Navigate to='/' />
  }

  const handleLogin = event => {
    event.preventDefault()
    const cred = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    event.target.username.value = ""
    event.target.password.value = ""
    login(cred)
    if (user?.username !== "") {
      return <Navigate to='/' />
    }
  }

  return (
    <div className='flex justify-center items-center p-10 bg-laptop bg-cover bg-no-repeat bg-right-top min-h-[85vh]'>
      <div className='flex flex-col bg-slate-100/90 backdrop-blur-sm rounded-3xl py-10 px-1 h-full items-center gap-y-10 font-main text-2xl'>
        <p className='font-bold text-black italic'>Login</p>
        <form
          onSubmit={handleLogin}
          className='flex flex-col items-center gap-y-5 font-main'
        >
          <div className='grid place-items-center'>
            <p>Username:</p>
            <input
              type='text'
              name='username'
              placeholder='Username'
              minLength={3}
              maxLength={15}
              required='true'
              className='rounded-2xl px-5'
            />
          </div>
          <div className='grid place-items-center'>
            <p>Password:</p>
            <input
              type='password'
              name='password'
              placeholder='Password'
              minLength={3}
              maxLength={15}
              required='true'
              className='rounded-2xl px-5'
            />
          </div>
          <button
            type='submit'
            className='bg-primary rounded-full py-3 px-5 hover:bg-secondary-100 transition duration-300 ease-in-out hover:scale-110 hover:rounded-3xl'
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, { login })(LoginBlank)
