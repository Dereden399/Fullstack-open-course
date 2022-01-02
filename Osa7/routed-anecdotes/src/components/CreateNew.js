import React from "react"
import { useHistory } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = ({ addNewAnecdote }) => {
  const history = useHistory()
  const content = useField("text")
  const author = useField("text")
  const info = useField("text")

  const handleSubmit = event => {
    event.preventDefault()
    const anecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    }
    addNewAnecdote(anecdote)
    resetFields()
    history.push("/")
  }

  const resetFields = event => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      Create a new Anecdote
      <form onSubmit={handleSubmit} onReset={resetFields}>
        <div>
          Anecdote: <input {...content} />
        </div>
        <div>
          Author: <input {...author} />
        </div>
        <div>
          Url: <input {...info} />
        </div>
        <button type='submit'>Create</button>
        <button type='reset'>Reset</button>
      </form>
    </div>
  )
}

export default CreateNew
