import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Routes, Route } from "react-router-dom"

import Footer from "./components/Footer"
import NavigationBar from "./components/NavigationBar"
import DropdownNavbar from "./components/DropdownNavbar"
import MainPage from "./components/MainPage/MainPage"
import BlogList from "./components/BlogsList"
import Blog from "./components/Blog"
import LoginBlank from "./components/LoginBlank"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import UserPage from "./components/UserPage"
import UsersList from "./components/AllUsersList"
import RegisterBlank from "./components/RegisterBlank"
import NothingPage from "./components/404Page"

import { initializeBlogs } from "./reducers/blogsReducer"
import { checkUser } from "./reducers/userReducer"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  useEffect(() => {
    dispatch(checkUser())
  }, [dispatch])
  useEffect(() => {
    document.body.classList.add("bg-primaryWhite")
  }, [])

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Notification />
      <DropdownNavbar isOpen={isOpen} toggle={toggle} />
      <NavigationBar toggle={toggle} isOpen={isOpen} />

      <Routes>
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/blogs' element={<BlogList />} />
        <Route path='/login' element={<LoginBlank />} />
        <Route path='/add-blog' element={<BlogForm />} />
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='/users' element={<UsersList />} />
        <Route path='/register' element={<RegisterBlank />} />
        <Route path='/' element={<MainPage />} />
        <Route path='*' element={<NothingPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
