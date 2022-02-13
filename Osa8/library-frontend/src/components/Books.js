import React, { useState, useEffect } from "react"

import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = props => {
  const resultBooks = useQuery(ALL_BOOKS)
  const [booksToShow, setBooksToShow] = useState([])
  const [books, setBooks] = useState([])
  useEffect(() => {
    if (resultBooks.data) {
      setBooks(resultBooks.data.allBooks)
      setBooksToShow(resultBooks.data.allBooks)
    }
  }, [resultBooks.data])

  const filterHandler = e => {
    e.preventDefault()
    const authorFilter = e.target.authorFilter.value
    const genreFilter = e.target.genreFilter.value
    let booksToUpdate = books
    if (authorFilter !== "")
      booksToUpdate = booksToUpdate.filter(b => b.author.name === authorFilter)
    if (genreFilter !== "")
      booksToUpdate = booksToUpdate.filter(b => b.genres.includes(genreFilter))
    setBooksToShow(booksToUpdate)
  }

  if (resultBooks.loading) return <div>loading...</div>
  return (
    <div>
      <h2>Books</h2>
      <form onSubmit={filterHandler}>
        Sort by author:{" "}
        <select name='authorFilter'>
          <option value=''>all</option>
          {[...new Set(books.map(b => b.author.name))].map(a => (
            <option value={a} key={a}>
              {a}
            </option>
          ))}
        </select>
        <br />
        Sort by genre:{" "}
        <select name='genreFilter'>
          <option value=''>all</option>
          {[
            ...new Set(
              books.reduce((prev, cur) => {
                if (cur.genres.length === 0) return prev
                return prev.concat(cur.genres)
              }, [])
            ),
          ].map(g => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>
        <br />
        <button type='submit'>Filter</button>
      </form>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>genres</th>
            <th>published</th>
          </tr>
          {booksToShow.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.genres.join(", ")}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
