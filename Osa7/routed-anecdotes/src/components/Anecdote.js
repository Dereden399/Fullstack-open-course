import React from "react"

const Anecdote = ({ anecdote, vote }) => {
  const voteHandler = event => {
    event.preventDefault()
    vote(anecdote.id)
  }
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <b>by {anecdote.author}</b>
      <br />
      Has {anecdote.votes} vote(s) <button onClick={voteHandler}>vote</button>
      <br />
      More info:{" "}
      <a href={anecdote.info} target='_blank'>
        {anecdote.info}
      </a>
    </div>
  )
}

export default Anecdote
