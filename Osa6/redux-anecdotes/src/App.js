import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { initializeAnecdotes } from "./reducers/anecdoteReducer"

import AnecdoteForm from "./components/AnecdoteForm"
import Anecdotes from "./components/Anecdotes"
import Notification from "./components/Notification"
import FilterForm from "./components/FilterForm"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
  return (
    <div>
      <h2>Best anecdotes</h2>
      <hr />
      <Notification />
      <FilterForm />
      <Anecdotes />
      <hr />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
