import React, { useState, useRef } from "react"
import {
  Switch,
  Link,
  Route,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom"

import Footer from "./components/Footer"
import Menu from "./components/Menu"
import AnecdoteList from "./components/AnecdoteList"
import About from "./components/About"
import CreateNew from "./components/CreateNew"
import Anecdote from "./components/Anecdote"
import Notificaton from "./components/Notification"

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ])

  const notificationRef = useRef()

  const match = useRouteMatch("/anecdotes/:id")
  const anecdote = match
    ? anecdotes.find(x => x.id == Number(match.params.id))
    : null

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    notificationRef.current.makeNotification(
      `Successfully created '${anecdote.content}'!`,
      5,
      "success"
    )
  }

  const anecdoteById = id => anecdotes.find(a => a.id === id)

  const vote = id => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)))
    notificationRef.current.makeNotification("Voted successfully", 2, "success")
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <hr />
      <Notificaton ref={notificationRef} />
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} vote={vote} />
        </Route>
        <Route path='/create'>
          <CreateNew addNewAnecdote={addNew} />
        </Route>

        <Route path='/about'>
          <About />
        </Route>

        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <hr />
      <Footer />
    </div>
  )
}

export default App
