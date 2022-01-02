import React from "react"
import { registerNewUser } from "../reducers/userReducer"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"

import bg from "../images/register.jpg"

const LoginBlank = props => {
  const dispatch = useDispatch()
  const nav = useNavigate()

  const submitHandler = event => {
    event.preventDefault()
    const user = {
      username: event.target[0].value,
      password: event.target[1].value,
    }
    event.target[0].value = ""
    event.target[1].value = ""
    dispatch(registerNewUser(user)).then(res => {
      if (res) nav("/")
    })
  }

  return (
    <div className='flex justify-center items-center p-10 bg-laptop bg-cover bg-no-repeat bg-right-top min-h-[85vh]'>
      <div className='flex flex-col shadow-2xl bg-slate-100/90 backdrop-blur-sm rounded-3xl py-10 px-1 h-full items-center gap-y-10 font-main text-2xl'>
        <p className='font-bold text-black italic'>Register a new user:</p>
        <form
          onSubmit={submitHandler}
          className='flex flex-col items-center gap-y-5 font-main'
        >
          <div className='grid place-items-center'>
            <p>Username:</p>
            <input
              placeholder='Username'
              type='text'
              minLength={3}
              maxLength={15}
              required='true'
              className='rounded-2xl px-5'
            />
          </div>
          <div className='grid place-items-center'>
            <p>Password:</p>
            <input
              placeholder='Password'
              type='password'
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
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginBlank
