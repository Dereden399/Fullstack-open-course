import react from 'react'
import DeleteButton from './DeleteButton'

const Persons = ({ toShow, deleteHandler }) => (
    <div class='persons'>
        {toShow.map(person => <p>{person.name}: {person.number} <DeleteButton handler={deleteHandler}  id={person.id}/></p>)}
    </div>
)

export default Persons