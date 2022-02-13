import React, { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useApolloClient, useSubscription } from "@apollo/client"
import { ALL_BOOKS, BOOK_ADDED } from "./queries"

import Authors from "./components/Authors"
import Books from "./components/Books"
import LoginForm from "./components/LoginForm"
import NewBook from "./components/NewBook"
import Recommendations from "./components/Recommendations"

const App = () => {
  const nav = useNavigate()
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id)
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setToken(localStorage.getItem("token"))
    }
  }, [])
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`Book '${subscriptionData.data.bookAdded.title}' added`)
      updateCacheWith(subscriptionData.data.bookAdded)
    },
  })

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => nav("/authors")}>authors</button>
        <button onClick={() => nav("/books")}>books</button>
        {token ? (
          <button onClick={() => nav("/addBook")}>add book</button>
        ) : null}
        {token ? (
          <button onClick={() => nav("/recommendations")}>
            recommendations
          </button>
        ) : null}
        {token ? (
          <button onClick={logout}>logout</button>
        ) : (
          <button onClick={() => nav("/login")}>login</button>
        )}
      </div>
      <hr />
      <Routes>
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route
          path='/addBook'
          element={<NewBook updateCacheWith={updateCacheWith} />}
        />
        <Route
          path='/login'
          element={<LoginForm token={token} setToken={setToken} />}
        />
        <Route path='/recommendations' element={<Recommendations />} />
      </Routes>
    </div>
  )
}

export default App
