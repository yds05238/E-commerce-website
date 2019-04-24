import React from 'react';

export default function Product({ id, name, date, price, editProduct, deleteProduct }) {
  return (
    <div>
      <div>Name: {name} </div>
      <div>Date: {date}</div>
      <div>Price: {price}</div>
      <div>
        <button onClick={() => editProduct(id, price)}>Edit</button>
        <button onClick={() => deleteProduct(id)}>Delete</button>
      </div>
    </div>
  )
}
