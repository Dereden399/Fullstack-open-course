import anecService from "../components/services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.data]
    case "VOTE":
      const changedAnecdote = action.data.changedAnecdote
      return state.map(x => (x.id !== changedAnecdote.id ? x : changedAnecdote))
    case "INIT":
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecService.getAll()
    dispatch({
      type: "INIT",
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const createdAnecdote = await anecService.createNew(asObject(content))
    dispatch({
      type: "ADD",
      data: createdAnecdote,
    })
  }
}

export const vote = id => {
  return async dispatch => {
    const changedAnecdote = await anecService.voteDB(id)
    dispatch({
      type: "VOTE",
      data: { changedAnecdote },
    })
  }
}

export default reducer
