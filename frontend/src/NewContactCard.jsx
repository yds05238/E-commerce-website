import React, { Component } from 'react';

export default class NewContactCard extends Component {
  state = { name: '', email: '' };

  nameChange = e => this.setState({ name: e.currentTarget.value });

  emailChange = e => this.setState({ email: e.currentTarget.value });

  submitClicked = () => {
    //const d = new Date();
    //const date = `${d.getFullYear()}-${1 + d.getMonth()}-${d.getDate()}`;
    const { addContact } = this.props;
    const { name, email } = this.state;
    addContact({ name, email });
  };

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={this.nameChange} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={this.emailChange} />
          </label>
        </div>
        <div>
          <button onClick={this.submitClicked}>Submit</button>
        </div>
      </div>
    );
  }
}
