import React, { useState, useImperativeHandle } from "react"

const NOTF_TIME = 2000

const Notification = React.forwardRef((props, ref) => {
  const [message, setMessage] = useState("")
  const [type, setType] = useState("")

  const makeNotification = (text, notType) => {
    setMessage(text)
    setType(notType)
    setTimeout(() => {
      setMessage("")
      setType("")
    }, NOTF_TIME)
  }
  useImperativeHandle(ref, () => {
    return {
      makeNotification,
    }
  })

  if (message === "" || type === "") {
    return null
  }

  return <div className={type}>{message}</div>
})
Notification.displayName = "Notification"
export default Notification
