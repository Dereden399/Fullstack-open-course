import React from 'react'

const Course = ({course}) => {

  return (
    <div>
      <b>{course.name}</b>
      <ul>
        {course.parts.map(x => <li key={x.id}>{x.name}: {x.exercises}</li>)}
      </ul>
      <p>
        In total: {course.parts.reduce((sum, part) => sum += part.exercises, 0)} exercises
      </p>
      <hr />
    </div>
  )
}
export default Course;