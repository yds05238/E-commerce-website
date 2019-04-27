import React, { Component } from 'react';
import ContactCard from './ContactCard';
import NewContactCard from './NewContactCard';

export default class ContactCardList extends Component {
  state = { data: null };

  componentDidMount() {
    fetch('/contactcard')
      .then(resp => resp.json())
      .then(data => this.setState({ data }));
  }

  addContact = async ({ name, email }) => {
    const resp = await fetch(`/contactcard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    const text = await resp.text();
    const contact = { text, name, email };
    if (text !== 'NOT_OK') {
      await this.setState(({ data }) => ({ data: [...data, contact] }));
    }
    return null;
  };

  editContact = async (id, name) => {
    const newName = prompt('Change the content of the post', name);
    const resp = await fetch(`/contactcard/${id}`, {
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

  deleteContact = async id => {
    const resp = await fetch(`/contactcard/${id}`, { method: 'DELETE' });
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
            <h3>All Contacts (not sorted)</h3>
            <div>
              {data.length === 0 && <div>No contact available.</div>}
              {data.length > 0 &&
                data.map(({ id, name, email }) => (
                  <ContactCard
                    key={email}
                    id={id}
                    name={name}
                    email={email}
                    editContact={this.editContact}
                    deleteContact={this.deleteContact}
                  />
                ))}
            </div>
          </div>
        ) : (
            <div>Loading all contacts (not sorted)...</div>
          )}

        <div className="Block">
          <h3>Contact Adder</h3>
          <NewContactCard addContact={this.addContact} />
        </div>
      </div>
    );
  }
}

