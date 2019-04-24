import React, { Component } from 'react';
import Product from './Product';
import ProductAdder from './ProductAdder';

export default class Sale extends Component {
  state = { products: null };

  componentDidMount() {
    fetch('/product')
      .then(resp => resp.json())
      .then(products => this.setState({ products }));
  }

  addProduct = async ({ name, price }) => {
    const resp = await fetch(`/product`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price })
    });
    const id = await resp.text();
    const product = { id, name, price };
    this.setState(prevState => ({ products: [product, ...prevState.products] }));
  };

  editProduct = async (id, price) => {
    const newPrice = prompt('Change the price', price);
    const resp = await fetch(`/product/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: newPrice })
    });
    const text = await resp.text();
    if (text !== 'UPDATED') {
      throw new Error(`Bad response: ${text}`);
    }
    this.setState(prevState => ({
      products: prevState.products.map(p => (p.id === id ? { ...p, price: newPrice } : p))
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
              {products.length === 0 && <div>No produccts available.</div>}
              {products.length > 0 &&
                products.map(({ id, name, price }) => (
                  <Product
                    key={id}
                    id={id}
                    name={name}
                    price={price}
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
          <h3>Product Adder</h3>
          <ProductAdder addProduct={this.addProduct} />
        </div>
      </div>
    );
  }
}
