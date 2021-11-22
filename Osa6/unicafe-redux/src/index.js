import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"
import reducer from "./reducer"

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    })
  }
  const bad = () => {
    store.dispatch({
      type: "BAD",
    })
  }
  const ok = () => {
    store.dispatch({
      type: "OK",
    })
  }
  const zero = () => {
    store.dispatch({ type: "ZERO" })
  }

  return (
    <div>
      <h1>Best cafe in the World!</h1>
      <hr />
      <b>How can you discribe our cafe?</b> <br />
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <hr />
      <b>Statistics:</b> <br />
      <div>Good: {store.getState().good}</div>
      <div>Ok: {store.getState().ok}</div>
      <div>Bad: {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"))
}

renderApp()
store.subscribe(renderApp)
