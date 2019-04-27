import React, { Component } from 'react';

export default class NewUser extends Component {
  state = { name: '', email: '' };

  nameChange = e => this.setState({ name: e.currentTarget.value });

  emailChange = e => this.setState({ email: e.currentTarget.value });

  submitClicked = () => {
    //const d = new Date();
    //const date = `${d.getFullYear()}-${1 + d.getMonth()}-${d.getDate()}`;
    const { addUser } = this.props;
    const { name, email } = this.state;
    addUser({ name, email });
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
