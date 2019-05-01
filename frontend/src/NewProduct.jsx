import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { CardHeader } from '@material-ui/core';
import Button from '@material-ui/core/Button';


export default class NewProduct extends Component {
  state = { author: 'Anonymous', content: '' };

  authorChange = e => this.setState({ author: e.currentTarget.value });

  contentChange = e => this.setState({ content: e.currentTarget.value });

  submitClicked = () => {
    const d = new Date();
    const date = `${d.getFullYear()}-${1 + d.getMonth()}-${d.getDate()}`;
    const { addProduct } = this.props;
    const { author, content } = this.state;
    addProduct({ author, date, content });
  };

  render() {
    const { author, content } = this.state;
    return (
      <div>
        <div>
          <label>
            Author:
            <input type="text" value={author} onChange={this.authorChange} />
          </label>
        </div>
        <textarea value={content} onChange={this.contentChange} />
        <div>
          <button onClick={this.submitClicked}>Submit</button>
        </div>
      </div>
    );
  }
}
