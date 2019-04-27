import React, { Component } from 'react';
import './App.css';
import Product from './Product';
import NewProduct from './NewProduct';

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
        <div className="Block">
          <h3>Post Product for Sale</h3>
          <NewProduct addProduct={this.addProduct} />
        </div>
      </div>
    );
  }
}
