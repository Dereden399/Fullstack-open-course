import React, { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = async event => {
    event.preventDefault()
    await createBlog({ title, author, url })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        Title
        <input
          id='title'
          value={title}
          onChange={event => {
            setTitle(event.target.value)
          }}
        />
      </div>
      <div>
        Author
        <input
          id='author'
          value={author}
          onChange={event => {
            setAuthor(event.target.value)
          }}
        />
      </div>
      <div>
        Url
        <input
          id='url'
          value={url}
          onChange={event => {
            setUrl(event.target.value)
          }}
        />
      </div>
      <button id='add-blog-button' type='submit'>
        Add
      </button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
