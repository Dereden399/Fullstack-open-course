import React, { useEffect } from "react"
import { useLazyQuery, useQuery } from "@apollo/client"
import { ALL_GENRE_FILTER_BOOKS, GET_USER } from "../queries"

const TableBooks = ({ books }) => (
  <table>
    <thead>
      <tr>
        <th>title</th>
        <th>author</th>
        <th>published</th>
      </tr>
    </thead>
    <tbody>
      {books.map(b => (
        <tr key={b.title}>
          <td>{b.title}</td>
          <td>{b.author.name}</td>
          <td>{b.published}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

const Recommendations = () => {
  const [findRecommend, recommendBooks] = useLazyQuery(ALL_GENRE_FILTER_BOOKS)
  const user = useQuery(GET_USER, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      if (user.data.me) {
        findRecommend({
          variables: { genre: user.data.me.favoriteGenre },
        })
      }
    },
  })

  if (user.loading || recommendBooks.loading) return <div>Loading...</div>
  if (!user.data.me || !recommendBooks.data) return <div>Not logged in</div>
  return (
    <div>
      <h2>Recommendations</h2>
      <b>Books based on your favorite genre "{user.data.me.favoriteGenre}"</b>
      {recommendBooks.data.allBooks.length > 0 ? (
        <TableBooks books={recommendBooks.data.allBooks} />
      ) : (
        <p>No books in this genre</p>
      )}
    </div>
  )
}

export default Recommendations
