import React, { useState, useEffect, useRef } from "react"

import Blog from "./components/blog"
import LoginBlank from "./components/loginBlank"
import BlogForm from "./components/blogForm"
import Notification from "./components/notification"
import Togglable from "./components/togglable"

import blogService from "./services/blogService"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const notifRef = useRef()

  useEffect(() => {
    blogService.getAll().then(x => setBlogs(x))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async creditentials => {
    try {
      const user = await loginService.login(creditentials)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      notifRef.current.makeNotification("Successfully logged in!", "success")
    } catch (error) {
      notifRef.current.makeNotification("Wrong username or password", "error")
    }
  }

  const logout = event => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem("loggedUser")
    blogService.setToken("")
    notifRef.current.makeNotification("Successfully logged out!", "success")
  }

  const addBlog = async newBlog => {
    blogFormRef.current.toggleVisibility()
    try {
      const addedBlog = await blogService.add(newBlog)
      setBlogs(blogs.concat(addedBlog))
      notifRef.current.makeNotification("Blog successfully added!", "success")
    } catch (error) {
      notifRef.current.makeNotification("Something went wrong", "error")
    }
  }

  const likeBlog = async blog => {
    try {
      let blogToUpdate = { ...blog }
      blogToUpdate.likes += 1
      await blogService.update(blog.id, blogToUpdate)
      setBlogs(blogs.map(x => (x.id !== blogToUpdate.id ? x : blogToUpdate)))
    } catch (error) {
      notifRef.current.makeNotification("You must be logged in!", "error")
    }
  }

  const deleteBlog = async blog => {
    try {
      if (
        window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`)
      ) {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(x => x.id !== blog.id))
        notifRef.current.makeNotification("Successfully deleted", "success")
      }
    } catch (error) {
      notifRef.current.makeNotification("Something went wrong", "error")
    }
  }

  return (
    <div>
      <h1>Very interesting blog project</h1>
      <hr />
      <Notification ref={notifRef} />
      {user === null ? (
        <Togglable buttonLabel='log in'>
          <LoginBlank handleLogin={handleLogin} />
        </Togglable>
      ) : (
        <p>{user.name} logged in</p>
      )}
      {user !== null && <button onClick={logout}>Logout</button>}
      <hr />
      {user !== null && (
        <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      )}
      <p>Blogs:</p>
      {blogs
        .sort((prev, now) => now.likes - prev.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            like={likeBlog}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  )
}

export default App
