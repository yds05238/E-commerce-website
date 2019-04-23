import React, { Component } from 'react';

export default class UserAdder extends Component {
  state = { email: '', password: '' };

  emailChange = e => this.setState({ email: e.currentTarget.value });

  passwordChange = e => this.setState({ password: e.currentTarget.value });

  submitClicked = () => {
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
        </div>
        <textarea value={password} onChange={this.passwordChange} />
        <div>
          <button onClick={this.submitClicked}>Submit</button>
        </div>
      </div>
    );
  }
}
