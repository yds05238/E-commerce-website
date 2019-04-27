import React, { Component } from 'react';
import User from './User';
import NewUser from './NewUser';

export default class Users extends Component {
  state = { users: null };

  componentDidMount() {
    fetch('/user')
      .then(resp => resp.json())
      .then(users => this.setState({ users }));
  }

  addUser = async ({ email, password }) => {
    const resp = await fetch(`/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const text = await resp.text();
    const user = { text, email, password };
    if (text !== 'NOT_OK') {
      await this.setState(({ users }) => ({ users: [...users, user] }));
    }
    return null;
  };

  editUser = async (id, password) => {
    const newPassword = prompt('Change the content of the post', password);
    const resp = await fetch(`/user/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword })
    });
    const text = await resp.text();
    if (text !== 'UPDATED') {
      throw new Error(`Bad response: ${text}`);
    }
    this.setState(prevState => ({
      users: prevState.users.map(p => (p.id === id ? { ...p, password: newPassword } : p))
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
              {users.length === 0 && <div>No user available.</div>}
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
          <h3>User Sign Up</h3>
          <NewUser addUser={this.addUser} />
        </div>
      </div>
    );
  }
}

