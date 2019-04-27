import React, { Component } from 'react';
import User from './User';
import NewUser from './NewUser';

export default class Users extends Component {
  state = { data: null };

  componentDidMount() {
    fetch('/user')
      .then(resp => resp.json())
      .then(data => this.setState({ data }));
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
      await this.setState(({ data }) => ({ data: [...data, user] }));
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
      data: prevState.data.map(p => (p.id === id ? { ...p, name: newName } : p))
    }));
  };

  deleteUser = async id => {
    const resp = await fetch(`/user/${id}`, { method: 'DELETE' });
    const text = await resp.text();
    if (text !== 'DELETED') {
      throw new Error(`Bad response: ${text}`);
    }
    this.setState(prevState => ({ data: prevState.data.filter(p => p.id !== id) }));
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        {data != null ? (
          <div className="Block">
            <h3>All Users</h3>
            <div>
              {data.length === 0 && <div>No user available.</div>}
              {data.length > 0 &&
                data.map(({ id, name, email }) => (
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

