import React from 'react';

export default function ContactCard({ id, name, email, editContact, deleteContact }) {
  return (
    <div>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <div>
        <button onClick={() => editContact(id, name)}>Edit</button>
        <button onClick={() => deleteContact(id)}>Delete</button>
      </div>
    </div>
  )
}
