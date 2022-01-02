import React, { useEffect, useState } from "react"
import userSerices from "../Services/userServices"
import { Link } from "react-router-dom"

const FilteredList = ({ filter, users }) => {
  const filteredUsers = users.filter(x =>
    x.username.toLowerCase().includes(filter.toLowerCase().trim())
  )
  if (filteredUsers.length === 0)
    return (
      <div className='bg-white rounded-xl shadow-2xl p-1'>
        <h3 className='font-main text-2xl font-bold text-highlight'>
          No such users here...
        </h3>
      </div>
    )
  return (
    <div className='bg-white rounded-xl shadow-2xl p-1'>
      <table className='table-fixed divide-y divide-gray-400 font-main text-lg'>
        <thead>
          <th className='px-5'>User</th>
          <th className='px-5'>Blog</th>
        </thead>
        <tbody className='divide-y divide-gray-400'>
          {filteredUsers.map(user => (
            <tr className='transition hover:scale-105 duration-100 '>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td className='px-5'>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const UsersList = props => {
  const [users, setUsers] = useState(null)
  const [filter, setFilter] = useState("")
  useEffect(
    () =>
      userSerices
        .getAll()
        .then(data => setUsers(data))
        .catch(error => setUsers(null)),
    []
  )
  if (!users) return <h1>Loading</h1>
  return (
    <div className='flex flex-col items-center px-1 py-5 font-main gap-y-3'>
      <p className='font-pacifico font-bold italic text-4xl text-primary mb-16'>
        All users
      </p>
      <input
        placeholder='Write user here'
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className='rounded-xl p-1'
      />
      <FilteredList filter={filter} users={users} />
    </div>
  )
}

export default UsersList
