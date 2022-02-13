import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = props => {
  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR)
  const [selectedAuthor, changeAuthor] = useState("")
  const [newBorn, setNewBorn] = useState("")

  const NewBornHandler = event => {
    event.preventDefault()
    if (selectedAuthor !== "") {
      editAuthor({ variables: { name: selectedAuthor, setBornTo: newBorn } })
      setNewBorn("")
    }
  }

  if (result.loading) return <div>loading...</div>

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={NewBornHandler}>
        <select
          value={selectedAuthor}
          onChange={e => changeAuthor(e.target.value)}
        >
          {result.data.allAuthors.map(a => (
            <option value={a.name} key={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        born{" "}
        <input
          type='number'
          value={newBorn}
          onChange={e => setNewBorn(Number(e.target.value))}
        />
        <button type='submit'>set</button>
      </form>
    </div>
  )
}

export default Authors
