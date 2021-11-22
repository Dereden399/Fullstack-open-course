const initialStore = ""

const filterReducer = (state = initialStore, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.data
    default:
      return state
  }
}

export const setFilter = text => {
  return {
    type: "SET_FILTER",
    data: text,
  }
}

export default filterReducer
