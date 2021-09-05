const DeleteButton = ({handler, id}) => {
  return (
    <button onClick={() => handler(id)}>Poistaa</button>
  )
}
export default DeleteButton