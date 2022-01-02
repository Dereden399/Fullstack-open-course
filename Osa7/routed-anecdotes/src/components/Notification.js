import React, { useState, useImperativeHandle } from "react"

const Notification = React.forwardRef((props, ref) => {
  const [message, setMessage] = useState("")
  const [type, setType] = useState("")

  const makeNotification = (text, duration, notType) => {
    const nowTimer = window.localStorage.getItem("notificationTimer")
    if (nowTimer != null) {
      clearTimeout(Number(nowTimer))
    }
    setMessage(text)
    setType(notType)
    const timer = setTimeout(() => {
      setMessage("")
      setType("")
      window.localStorage.removeItem("notificationTimer")
    }, duration * 1000)
    window.localStorage.setItem("notificationTimer", timer)
  }

  useImperativeHandle(ref, () => {
    return { makeNotification }
  })

  if (message === "" || type === "") {
    return null
  }

  return <div className={type}>{message}</div>
})
Notification.displayName = "Notification"

export default Notification
