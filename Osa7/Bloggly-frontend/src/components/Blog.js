import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router"
import { vote, commentBlog } from "../reducers/blogsReducer"
import { HeartIcon } from "@heroicons/react/outline"
import { PaperAirplaneIcon } from "@heroicons/react/solid"

const CommentForm = props => {
  if (!props.user.username) return <p>You must be logged in to comment</p>
  return (
    <form
      onSubmit={props.commentHandler}
      className='bg-transparent flex flex-row items-center'
    >
      <input
        name='comment'
        placeholder='Write your comment here'
        className='bg-transparent border-b-2 border-black/50 outline-none'
        required
      />
      <button type='submit'>
        <PaperAirplaneIcon className='w-8 h-8 transition-transform hover:scale-105 active:scale-90 duration-100 ease-in-out rotate-90' />
      </button>
    </form>
  )
}

const Blog = props => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state =>
    id !== "" ? state.blogs.find(x => x.id === id) : null
  )
  const user = useSelector(state => state.user)

  if (!blog)
    return (
      <div className='grid grid-rows-1 justify-center items-center h-[80vh]'>
        <p className='font-main font-bold text-5xl'>
          Whoops, It seems, that we don't have this blog
        </p>
      </div>
    )

  const like = () => {
    dispatch(vote(blog))
  }

  const addComment = event => {
    event.preventDefault()
    dispatch(commentBlog(blog, event.target[0].value))
    event.target[0].value = ""
  }
  return (
    <div className='bg-books min-h-[85vh] bg-cover bg-no-repeat py-2 px-1'>
      <div className='bg-slate-100/80 backdrop-blur-xl rounded-3xl px-1 py-2 w-full flex flex-col items-center font-main text-xl'>
        <div className='flex flex-col mb-10'>
          <p className='font-bold italic text-5xl font-pacifico my-3 text-primary border-b-2 border-slate-500/80 shadow-2xl'>
            {blog.title}
          </p>
          <p className='place-self-end'>
            by{" "}
            <span className='text-2xl font-bold text-secondary-300'>
              {blog.author}
            </span>
          </p>
        </div>
        <div className='w-auto h-auto flex flex-row items-center '>
          <p>Has {blog.likes} like(s).</p>
          <button onClick={like}>
            <HeartIcon className='w-8 h-8 fill-red-500 hover:fill-red-400 active:fill-red-600 active:scale-110 transition-transform duration-100 ease-in-out' />
          </button>
        </div>
        <p className='text-lg italic text-slate-500/80'>
          You can read more on{" "}
          <a
            href={blog.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-slate-700/80 border-b-2 border-highlight border-dotted'
          >
            {blog.url}
          </a>
        </p>
        <p className='italic mb-16 border-b-2 border-secondaryWhite'>
          Written by{" "}
          <span className='font-bold text-secondary-300'>
            {blog.user.username}
          </span>
        </p>
        <div className='w-full flex flex-col items-center'>
          <div className='w-full bg-secondary-300 rounded-t-2xl py-3 grid place-content-center backdrop-blur-2xl border-b-2 border-secondary-500'>
            <p className='italic text-secondary-100'>
              What do you think about this blog?
            </p>
          </div>
          <div className='bg-gradient-to-b from-secondary-300 to-secondary-400 w-full p-1 rounded-b-2xl backdrop-blur-2xl'>
            <div className='flex flex-col items-center'>
              <CommentForm user={user} commentHandler={addComment} />
              <div className='h-auto max-h-32 w-60 flex flex-col items-start'>
                <p className='self-center'>Comments:</p>
                <div className='overflow-y-auto w-full'>
                  {blog.comments.length > 0 ? (
                    blog.comments.map(com => <p className='italic'>{com}</p>)
                  ) : (
                    <p className='font-bold'>
                      This blog has not any comments yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
