const reducer = (
  state = { message: "", type: "", shouldEnd: false },
  action
) => {
  switch (action.type) {
    case "SET_NOT":
      return action.data
    case "REMOVE_NOT":
      return { message: "", type: "", shouldEnd: true }
    case "toggleEnd":
      const newState = { ...state, shouldEnd: !state.shouldEnd }
      return newState
    default:
      return state
  }
}

export const makeNotification = (message, type, duration = 3) => {
  return async dispatch => {
    if (duration < 1) duration = 1
    const nowTimer = window.localStorage.getItem("nowTimer")
    const endTim = window.localStorage.getItem("endTime")
    if (nowTimer) clearTimeout(Number(nowTimer))
    if (endTim) clearTimeout(Number(endTim))
    dispatch({
      type: "SET_NOT",
      data: { message, type, shouldEnd: false },
    })
    const newTimer = setTimeout(() => {
      window.localStorage.removeItem("nowTimer")
      dispatch(removeNotification())
    }, duration * 1000 - 400)
    window.localStorage.setItem("nowTimer", newTimer)
  }
}

export const removeNotification = () => {
  return async dispatch => {
    dispatch({ type: "toggleEnd" })
    const endTime = setTimeout(() => {
      dispatch({ type: "REMOVE_NOT" })
      window.localStorage.removeItem("endTime")
    }, 400)
    window.localStorage.setItem("endTime", endTime)
  }
}

export default reducer
