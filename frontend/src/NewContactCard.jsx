import React, { Component } from 'react';

export default class NewContactCard extends Component {
  state = { name: '', email: '' };

  nameChange = (e) => this.setState({ name: e.currentTarget.value });

  emailChange = (e) => this.setState({ email: e.currentTarget.value });

  render() {
    const { onSubmit } = this.props;
    const { name, email } = this.state;
    return (
      <div>
        <form>
          <h3>New Contact Card</h3>
          <label>
            Name:
            <input type="text" placeholder="Name" value={name} onChange={this.nameChange} />
          </label>
          <label>
            Email:
            <input type="email" placeholder="Email" value={email} onChange={this.emailChange} />
          </label>
          <button onClick={() => onSubmit(name, email)}>Submit</button>
        </form>
      </div>
    );
  }
}
