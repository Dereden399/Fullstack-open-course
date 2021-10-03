const AddPersonForm = ({ name, nameHandler, number, numberHandler, addPersonHandler }) => (
    <form onSubmit={addPersonHandler}>
        <div>
            Nimi: <input value={name} onChange={event => nameHandler(event.target.value)} />
        </div>
        <div>
            Puhelinnumero: <input value={number} onChange={event => numberHandler(event.target.value)} />
        </div>
        <div>
            <button type="submit">Lisätä</button>
        </div>
    </form>
)

export default AddPersonForm