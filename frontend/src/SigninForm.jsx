import React, { Component } from 'react';

export default class SigninForm extends Component {
  state = { email: '', password: '' };
  emailChange = e => this.setState({ email: e.currentTarget.value });
  passwordChange = e => this.setState({ password: e.currentTarget.value });

  handleSignIn(e) {
    e.preventDefault()
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    this.props.onSignIn(email, password);
  };

  render() {

    return (
      <form onSubmit={this.handleSignIn.bind(this)}>
        <h3>Sign In</h3>
        <input type="email" ref="email" placeholder="Email" onChange={this.emailChange} />
        <input type="password" ref="password" placeholder="Password" onChange={this.passwordChange} />
        <input type="submit" value="Login" />
      </form>
    )
  }
}