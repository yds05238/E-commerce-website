import React, { Component } from 'react';

export default class ProductAdder extends Component {
  state = { name: '', price: 0 };

  nameChange = e => this.setState({ name: e.currentTarget.value });

  priceChange = e => this.setState({ price: e.currentTarget.value });

  submitClicked = () => {
    const d = new Date();
    const date = `${d.getFullYear()}-${1 + d.getMonth()}-${d.getDate()}`;
    const { addProduct } = this.props;
    const { name, price } = this.state;
    addProduct({ name, date, price });
  };

  render() {
    const { name, price } = this.state;
    return (
      <div>
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={this.nameChange} />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input type="integer" value={price} onChange={this.priceChange} />
          </label>
        </div>

        <div>
          <button onClick={this.submitClicked}>Submit</button>
        </div>
      </div>
    );
  }
}
