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

  addUser = async ({ name, email }) => {
    const resp = await fetch(`/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    const text = await resp.text();
    const user = { text, name, email };
    if (text !== 'NOT_OK') {
      await this.setState(({ users }) => ({ users: [...users, user] }));
    }
    return null;
  };

  editUser = async (id, name) => {
    const newName = prompt('Change the content of the post', name);
    const resp = await fetch(`/user/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName })
    });
    const text = await resp.text();
    if (text !== 'UPDATED') {
      throw new Error(`Bad response: ${text}`);
    }
    this.setState(prevState => ({
      users: prevState.users.map(p => (p.id === id ? { ...p, name: newName } : p))
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
                users.map(({ id, name, email }) => (
                  <User
                    key={email}
                    id={id}
                    name={name}
                    email={email}
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

