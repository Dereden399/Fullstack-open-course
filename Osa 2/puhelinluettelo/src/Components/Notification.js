const Notification = ({text, type}) => {
  if(text === null || type === null) return null;
  return (
    <div className={type}>
      {text}
    </div>
  )
}
export default Notification