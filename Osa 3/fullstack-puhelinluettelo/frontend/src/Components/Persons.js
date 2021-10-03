import DeleteButton from './DeleteButton'

const Persons = ({ toShow, deleteHandler }) => (
    <div class='persons'>
        {toShow.map(person => <p className='list'>{person.name}: {person.number} <DeleteButton handler={deleteHandler}  id={person.id}/></p>)}
    </div>
)

export default Persons