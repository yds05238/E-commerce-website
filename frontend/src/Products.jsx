import React, { Component } from 'react';
import './App.css';
import Product from './Product';
import NewProduct from './NewProduct';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';



export default class Products extends Component {
  state = { products: null };

  componentDidMount() {
    fetch('/product')
      .then(resp => resp.json())
      .then(products => this.setState({ products }));
    /*fetch('/post/today')
      .then(resp => resp.json())
      .then(postsToday => this.setState({ postsToday }));
    fetch('/post/sorted')
      .then(resp => resp.json())
      .then(postsSorted => this.setState({ postsSorted }));*/
  }

  addProduct = async ({ date, author, content }) => {
    const resp = await fetch(`/product`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, date, content })
    });
    const id = await resp.text();
    const product = { id, author, date, content };
    this.setState(prevState => ({ products: [product, ...prevState.products] }));
  };

  editProduct = async (id, content) => {
    const newContent = prompt('Change the content of the post', content);
    const resp = await fetch(`/product/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newContent })
    });
    const text = await resp.text();
    if (text !== 'UPDATED') {
      throw new Error(`Bad response: ${text}`);
    }
    this.setState(prevState => ({
      products: prevState.products.map(p => (p.id === id ? { ...p, content: newContent } : p))
    }));
  };

  deleteProduct = async id => {
    const resp = await fetch(`/product/${id}`, { method: 'DELETE' });
    const text = await resp.text();
    if (text !== 'DELETED') {
      throw new Error(`Bad response: ${text}`);
    }
    this.setState(prevState => ({ products: prevState.products.filter(p => p.id !== id) }));
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        <div className="Block">
          <h3>Post Product for Sale</h3>
          <NewProduct addProduct={this.addProduct} />
        </div>
        {products != null ? (
          <div className="Block">
            <h3>All Products</h3>
            <div>
              {products.length === 0 && <div>No posts available.</div>}
              {products.length > 0 &&
                products.map(({ id, author, date, content }) => (
                  <Product
                    key={id}
                    id={id}
                    author={author}
                    date={date}
                    content={content}
                    editProduct={this.editProduct}
                    deleteProduct={this.deleteProduct}
                  />
                ))}
            </div>
          </div>
        ) : (
            <div>Loading all products...</div>
          )}

      </div>
    );
  }
}


      /*
       {cards.map(card => (
                <Grid item key={card} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Heading
                          </Typography>
                      <Typography>
                        This is a media card. You can use this section to describe the content.
                          </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                          </Button>
                      <Button size="small" color="primary">
                        Edit
                          </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
      
*/