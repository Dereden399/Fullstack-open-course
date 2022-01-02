import React from "react"
import { Link } from "react-router-dom"

const padding = {
  padding: 5,
}

const Menu = () => (
  <div>
    <Link to='/' style={padding}>
      Anecdotes
    </Link>
    <Link to='/create' style={padding}>
      Create new
    </Link>
    <Link to='/about' style={padding}>
      About
    </Link>
  </div>
)

export default Menu
