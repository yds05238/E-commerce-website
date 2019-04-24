import React, { Component } from 'react';
import SigninForm from './SigninForm';

export default class Signin extends Component {
  state = { user: null };

  componentDidMount() {
    fetch('/login')
      .then(resp => resp.json())
      .then(user => this.setState({ user }))
  }

  signIn = async ({ email, password }) => {
    const resp = await fetch('/login', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const id = await resp.text();
    const user = { id, email, password };
    this.setState(user);

  };

  signOut() {
    this.setState({ user: null })
  };
  render() {
    const { user } = this.state;
    return (
      <div>
        <h1>E Commerce APP</h1>


        <SigninForm
          onSignIn={this.signIn} />

      </div>


    )
  }
}

