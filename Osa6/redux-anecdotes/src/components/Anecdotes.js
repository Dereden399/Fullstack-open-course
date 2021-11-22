import React from "react"
import { connect } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdotes = props => {
  const voteFunc = (id, text) => {
    props.vote(id)
    props.setNotification(`You voted for ${text}`, 3)
  }
  return (
    <ul>
      {props.anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <li key={anecdote.id}>
            <div>{anecdote.content}</div>
            Has {anecdote.votes} vote(s){" "}
            <button
              onClick={() => {
                voteFunc(anecdote.id, anecdote.content)
              }}
            >
              vote
            </button>
          </li>
        ))}
    </ul>
  )
}

const mapStateToProps = state => {
  return {
    anecdotes:
      state.filter === ""
        ? state.anecdotes
        : state.anecdotes.filter(x => {
            return x.content.toLowerCase().includes(state.filter.toLowerCase())
          }),
  }
}

export default connect(mapStateToProps, { vote, setNotification })(Anecdotes)
