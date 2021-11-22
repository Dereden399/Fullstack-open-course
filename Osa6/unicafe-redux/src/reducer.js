const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}

const counterReducer = (state = initialState, action) => {
  let num = 0
  switch (action.type) {
    case "GOOD":
      num = state.good + 1
      return { ...state, good: num }
    case "OK":
      num = state.ok + 1
      return { ...state, ok: num }
    case "BAD":
      num = state.bad + 1
      return { ...state, bad: num }
    case "ZERO":
      return { good: 0, ok: 0, bad: 0 }
    default:
      return state
  }
}

export default counterReducer
