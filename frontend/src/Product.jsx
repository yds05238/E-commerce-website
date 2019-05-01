import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { CardHeader } from '@material-ui/core';
import Button from '@material-ui/core/Button';
//import CardMedia from '@material-ui/core/CardMedia';
//import { CardMedia } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';



export default function Product({ id, author, date, content, editProduct, deleteProduct }) {
  return (
    <Card className="card">
      <CardHeader title="Product" />

      <CardContent>
        <div>Seller: {author}</div>
        <div>Date: {date}</div>
        <div>
          <div>Content</div>
          <div>{content}</div>
        </div>

      </CardContent>
      <CardActions>

        <Button onClick={() => editProduct(id, content)}>Edit</Button>
        <Button onClick={() => deleteProduct(id)}>Delete</Button>
      </CardActions>
    </Card>
  )



}
/* <div>
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
    </div>*/