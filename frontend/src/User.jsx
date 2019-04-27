import React from 'react';

export default function User({ id, email, password, editUser, deleteUser }) {
  return (
    <div>
      <div>Email: {email}</div>
      <div>Password: {password}</div>
      <div>
        <button onClick={() => editUser(id, password)}>Edit</button>
        <button onClick={() => deleteUser(id)}>Delete</button>
      </div>
    </div>
  )
}