const initialState = ""

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.data
    case "CLEAR_MESSAGE":
      return initialState
    default:
      return state
  }
}

export const setMessage = message => {
  return {
    type: "SET_MESSAGE",
    data: message,
  }
}

export const setNotification = (message, duration) => {
  return async dispatch => {
    dispatch(setMessage(message))
    let nowTimer = window.localStorage.getItem("NotificationTimer")
    if (nowTimer != null) {
      clearTimeout(Number(nowTimer))
    }
    const timer = setTimeout(() => {
      dispatch(clearMessage())
      window.localStorage.removeItem("NotificationTimer")
    }, duration * 1000)
    window.localStorage.setItem("NotificationTimer", timer)
  }
}

export const clearMessage = () => {
  return {
    type: "CLEAR_MESSAGE",
  }
}

export default notificationReducer
