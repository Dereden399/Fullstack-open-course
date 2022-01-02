import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

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

const BlogList = props => {
  return (
    <div className='bg-books min-h-[85vh] bg-cover bg-no-repeat py-2 px-1'>
      <div className='bg-slate-100/80 backdrop-blur-xl rounded-3xl px-1 py-2 flex flex-col items-center shadow-2xl'>
        <p className='font-bold italic font-pacifico text-5xl text-primary border-b-2 border-slate-500/80 my-10'>
          Blog's feed
        </p>
        <div className='place-self-start w-full flex flex-col items-center gap-y-2'>
          {props.blogs.map(blog => (
            <BlogPreview blog={blog} />
          ))}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
  }
}

export default connect(mapStateToProps)(BlogList)
