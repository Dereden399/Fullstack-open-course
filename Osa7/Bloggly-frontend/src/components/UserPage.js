import React, { useEffect, useState } from "react"
import userSerices from "../Services/userServices"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { RefreshIcon, ThumbUpIcon } from "@heroicons/react/solid"

const BlogPreview = ({ blog }) => (
  <Link
    to={`/blogs/${blog.id}`}
    key={blog.id}
    className='bg-primaryWhite even:bg-secondaryWhite w-full rounded-2xl shadow-2xl grid grid-rows-2 place-items-center font-main text-secondary-100 even:text-secondary-200 hover:-translate-y-1 active:scale-95 transition ease-in-out duration-100'
  >
    <p to={`/blogs/${blog.id}`} className='font-bold italic text-xl shadow-2xl'>
      {blog.title}
    </p>
    <p className='text-base'>
      by <span className='text-lg font-bold'>{blog.author}</span>
    </p>
  </Link>
)

const UserPage = props => {
  const [user, setUser] = useState(null)
  const id = useParams().id
  useEffect(() => {
    userSerices
      .getOne(id)
      .then(data => setUser(data))
      .catch(error => setUser(error.response.status))
  }, [id])
  if (!user)
    return (
      <div className='grid grid-rows-1 justify-center items-center h-[80vh]'>
        <div className='font-main font-bold text-5xl flex flex-row items-center'>
          <RefreshIcon className='w-16 h-16 animate-reverseSpin' />
          <p>Loading...</p>
        </div>
      </div>
    )
  if (user === 404)
    return (
      <div className='grid grid-rows-1 justify-center items-center h-[80vh]'>
        <p className='font-main font-bold text-5xl'>
          No such user here.... But you can invite one!
        </p>
      </div>
    )
  const bestBlog = user.blogs.sort((prev, now) => now.likes - prev.likes)[0]
  console.log(user)
  return (
    <div className='flex flex-col items-center gap-y-5 font-main px-1 py-5 text-xl'>
      <h2 className='font-bold italic text-6xl text-primary border-b-2 border-slate-600'>
        {user.username}
      </h2>
      <div className='flex flex-col md:flex-row items-center justify-center md:items-start gap-y-5 gap-x-16 w-full font-main'>
        <div className='bg-white rounded-xl shadow-2xl p-2'>
          <p>Has {user.blogs.length} blogs</p>
          {bestBlog ? (
            <p>The most interesting blog by {user.username}:</p>
          ) : null}
          {bestBlog ? (
            <div className='flex flex-row ml-10'>
              <ThumbUpIcon className='w-5 h-5' />
              <Link
                to={`/blogs/${bestBlog.id}`}
                className='transition hover:scale-105 duration-100 text-2xl text-secondary-100'
              >
                <p>{bestBlog.title}</p>
              </Link>
            </div>
          ) : null}
        </div>
        {bestBlog ? (
          <div className='bg-white rounded-xl shadow-2xl p-1 flex flex-col items-center gap-y-2 w-full'>
            <p>Blogs:</p>
            <div className='place-self-start w-full flex flex-col items-center gap-y-2'>
              {user.blogs.map(blog => (
                <BlogPreview blog={blog} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default UserPage
