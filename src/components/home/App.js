import React, { useState, useEffect } from "react"

export default function App() {
  let [ users, setUsers ] = useState([])

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(json => {
        setUsers(json.users)
      })
  }, [])

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>Id : {user.id}, Name : {user.name}, years : {user.year} !</li>
      ))}
    </ul>
  )
}

