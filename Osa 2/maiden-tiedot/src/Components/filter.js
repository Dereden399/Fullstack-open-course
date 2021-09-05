import React from 'react'

const Filter = ({text, textHandler}) => {
    return (
      <div>
        Etsi maita: <input value={text} onChange={event => textHandler(event.target.value)}/>
      </div>
    )
}

export default Filter