import React, { Component } from 'react';
import ContactCard from './ContactCard';
import NewContactCard from './NewContactCard';

export default class ContactCardList extends Component {
  state = { data: null };

  componentDidMount() {
    fetch('/api/contact-cards')
      .then(resp => resp.json())
      .then(data => this.setState({ data }));
  }

  newContactCardSubmit = (name, email) => {
    fetch('/api/add-contact-card', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    })
      .then(resp => resp.text())
      .then(text => {
        if (text === 'OK') {
          this.setState(
            ({ data }) => ({ data: [...data, { name, email }] }),
          );
        } else {
          alert('Your contact card is not added because the email repeats!')
        }
      });
  };

  render() {
    const { data } = this.state;
    return (
      <section>
        <h3>Contact Card List</h3>
        <div>
          {data == null
            ? 'Loading...'
            : data.map(contactCard => <ContactCard key={contactCard.email} {...contactCard} />)
          }
        </div>
        {data != null && <NewContactCard onSubmit={this.newContactCardSubmit} />}
      </section>
    )
  }
}
