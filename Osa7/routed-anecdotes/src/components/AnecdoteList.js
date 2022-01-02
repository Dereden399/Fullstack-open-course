import React from "react"
import { Link } from "react-router-dom"

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      Anecdotes:
      <ul>
        {anecdotes.map(anecdote => (
          <li id={anecdote.id}>
            <Link to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnecdoteList
