import React, { useState } from "react"

const Blog = ({ blog, like, deleteBlog }) => {
  const [fullVisible, setVisible] = useState(false)

  const blogStyle = {
    borderStyle: "double",
    borderColor: "blue",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 5,
    padding: 3,
    paddingLeft: 10,
  }

  const toggleFull = () => {
    setVisible(!fullVisible)
  }

  const displayInfo = () => (
    <div>
      {blog.url} <br />
      Likes: {blog.likes}{" "}
      <button
        id='like-button'
        onClick={event => {
          event.preventDefault()
          like(blog)
        }}
      >
        like
      </button>
      <br />
      Written by <b>{blog.user.name}</b> <br />
      <button
        id='delete-button'
        onClick={event => {
          event.preventDefault()
          deleteBlog(blog)
        }}
      >
        delete this blog
      </button>
    </div>
  )

  return (
    <div style={blogStyle} className='blog'>
      <b>{blog.title}. </b>
      {blog.author}{" "}
      <button onClick={toggleFull}>{fullVisible ? "hide" : "show"}</button>
      {fullVisible === true && displayInfo()}
    </div>
  )
}

export default Blog
