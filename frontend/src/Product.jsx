import React from 'react';

export default function Product({ id, author, date, content, editProduct, deleteProduct }) {
  return (
    <div>
      <div>Author: {author}</div>
      <div>Date: {date}</div>
      <div>
        <div>Content</div>
        <div>{content}</div>
      </div>
      <div>
        <button onClick={() => editProduct(id, content)}>Edit</button>
        <button onClick={() => deleteProduct(id)}>Delete</button>
      </div>
    </div>
  )
}