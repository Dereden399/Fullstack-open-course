import react from "react"

const Filter = ({ filter, filterHandler }) => (
    <div>
        Kirjoita tähän filteri rajoittamaan henkilöitä  <input value={filter} onChange={event => filterHandler(event.target.value)} />
    </div>
)

export default Filter