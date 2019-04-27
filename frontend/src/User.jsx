import React from 'react';

export default function User({ id, name, email, editUser, deleteUser }) {
  return (
    <div>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <div>
        <button onClick={() => editUser(id, name)}>Edit</button>
        <button onClick={() => deleteUser(id)}>Delete</button>
      </div>
    </div>
  )
}