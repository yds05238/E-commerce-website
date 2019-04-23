import React, { Component } from 'react';
import User from './User';
import UserAdder from './UserAdder';

export default class Register extends Component {
  state = { users: null };

  componentDidMount() {
    fetch('/user')
      .then(resp => resp.json())
      .then(users => this.setState({ users }));
  }

  addUser = async ({ email, password }) => {
    const resp = await fetch(`/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const id = await resp.text();
    const user = { id, email, password };
    this.setState(prevState => ({ users: [user, ...prevState.users] }));
  };

  editUser = async (id, email) => {
    const newEmail = prompt('Change the email', email);
    const resp = await fetch(`/user/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newEmail })
    });
    const text = await resp.text();
    if (text !== 'UPDATED') {
      throw new Error(`Bad response: ${text}`);
    }
    this.setState(prevState => ({
      users: prevState.users.map(p => (p.id === id ? { ...p, email: newEmail } : p))
    }));
  };

  deleteUser = async id => {
    const resp = await fetch(`/user/${id}`, { method: 'DELETE' });
    const text = await resp.text();
    if (text !== 'DELETED') {
      throw new Error(`Bad response: ${text}`);
    }
    this.setState(prevState => ({ users: prevState.users.filter(p => p.id !== id) }));
  };

  render() {
    const { users } = this.state;
    return (
      <div>
        {users != null ? (
          <div className="Block">
            <h3>All Users</h3>
            <div>
              {users.length === 0 && <div>No users available.</div>}
              {users.length > 0 &&
                users.map(({ id, email, password }) => (
                  <User
                    key={email}
                    id={id}
                    email={email}
                    password={password}
                    editUser={this.editUser}
                    deleteUser={this.deleteUser}
                  />
                ))}
            </div>
          </div>
        ) : (
            <div>Loading all users...</div>
          )}
        <div className="Block">
          <h3>User Adder</h3>
          <UserAdder addUser={this.addUser} />
        </div>
      </div>
    );
  }
}
