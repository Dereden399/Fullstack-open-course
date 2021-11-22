import React from "react"
import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = props => {
  const addNewAnecdote = async event => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ""
    props.createAnecdote(anecdote)
    props.setNotification(`Anecdote ${anecdote} created!`, 3)
  }

  return (
    <form onSubmit={addNewAnecdote}>
      <div>
        <input name='anecdote' />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
