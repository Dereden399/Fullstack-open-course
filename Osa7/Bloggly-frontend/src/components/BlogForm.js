import React from "react"
import { createBlog } from "../reducers/blogsReducer"
import { useDispatch, useSelector } from "react-redux"

const BlogForm = props => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  if (!user.username) return <div>You must be logged in!</div>

  const handleSubmit = event => {
    event.preventDefault()
    const blog = {
      title: event.target[0].value,
      author: event.target[1].value,
      url: event.target[2].value,
    }
    event.target[0].value = ""
    event.target[1].value = ""
    event.target[2].value = ""
    dispatch(createBlog(blog))
  }

  return (
    <div className='grid place-items-center bg-books bg-cover min-h-[85vh]'>
      <div className='bg-slate-100/80 backdrop-blur-sm py-5 px-1 shadow-xl grid place-items-center gap-y-5 font-main text-2xl rounded-3xl'>
        <h2 className='py-5 md:text-5xl text-4xl text-secondary-200 font-bold italic'>
          Create a new blog
        </h2>
        <form
          onSubmit={handleSubmit}
          className='grid grid-rows-4 gap-y-2 place-items-center w-full'
        >
          <div className='grid place-items-start'>
            <p>Title</p>
            <input
              name='title'
              placeholder='Write title here...'
              required='true'
              className='rounded-2xl px-2 md:px-5'
            ></input>
          </div>
          <div className='grid place-items-start'>
            <p>Author</p>
            <input
              name='author'
              placeholder='Author...'
              required='true'
              className='rounded-2xl px-2 md:px-5'
            ></input>
          </div>
          <div className='grid place-items-start'>
            <p>Url</p>
            <input
              name='url'
              placeholder='Url of blog...'
              required='true'
              className='rounded-2xl px-2 md:px-5'
            ></input>
          </div>
          <button
            type='submit'
            className='place-self-end bg-primary rounded-full py-3 px-5 mx-2 hover:bg-secondary-100 transition duration-300 ease-in-out hover:scale-110 hover:rounded-3xl'
          >
            Add blog
          </button>
        </form>
      </div>
    </div>
  )
}

export default BlogForm
