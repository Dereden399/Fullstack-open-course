import React from "react"
import { connect } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const FilterForm = props => {
  const handleFilterChange = event => {
    props.setFilter(event.target.value)
  }

  return (
    <div>
      Filter anecdotes:{" "}
      <input name='filterInput' onChange={handleFilterChange} />
    </div>
  )
}

export default connect(null, { setFilter })(FilterForm)
