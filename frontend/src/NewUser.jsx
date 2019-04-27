import React, { Component } from 'react';

export default class NewUser extends Component {
  state = { email: '', password: '' };

  passwordChange = e => this.setState({ password: e.currentTarget.value });

  emailChange = e => this.setState({ email: e.currentTarget.value });

  submitClicked = () => {
    //const d = new Date();
    //const date = `${d.getFullYear()}-${1 + d.getMonth()}-${d.getDate()}`;
    const { addUser } = this.props;
    const { email, password } = this.state;
    addUser({ email, password });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div>
          <label>
            Email:
            <input type="email" value={email} onChange={this.emailChange} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={this.passwordChange} />
          </label>
        </div>
        <div>
          <button onClick={this.submitClicked}>Submit</button>
        </div>
      </div>
    );
  }
}
