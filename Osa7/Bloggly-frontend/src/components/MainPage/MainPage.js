import React from "react"
import { useNavigate } from "react-router-dom"

const MainPage = props => {
  const nav = useNavigate()
  return (
    <div className='flex items-center justify-center flex-col bg-primaryWhite'>
      <div className='flex flex-col md:flex-row items-center justify-center'>
        <div>
          <h1 className='font-bold text-7xl md:text-9xl subpixel-antialiased text-primary font-pacifico py-20 px-5'>
            Bloggly
          </h1>
        </div>
        <div className='flex flex-col px-10 font-main text-xl gap-y-5'>
          <h2 className='text-3xl font-bold italic'>
            A brand new blog project!
          </h2>
          <p className='italic'>
            <span className='font-bold text-secondary-300'>Modern</span> and{" "}
            <span className='font-bold text-highlight'>convinient</span> website
            for browsing blogs by other users or a good place to become a
            creator!
          </p>
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:gap-x-5 gap-y-1 py-10'>
        <button
          onClick={e => nav("/register")}
          className='bg-primary rounded-full font-bold text-3xl py-2 px-2 border-orange-800 border-4 border-double hover:bg-secondary-100'
        >
          Register now
        </button>
        <p className='text-secondary-300 place-self-center text-xl'>or</p>
        <button
          onClick={e => nav("/login")}
          className='bg-secondary-200 rounded-full font-bold text-3xl py-2 px-2 border-slate-700 border-4 border-double hover:bg-secondary-300'
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default MainPage
