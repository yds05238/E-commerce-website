/*
import React, { Component } from 'react';
import { render } from 'react-dom';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      open: false,
      pageNumber: 1,
    };
    this.handleDrawerClick = this.handleDrawerClick.bind(this);
    this.handleMenuClick1 = this.handleMenuClick1.bind(this);
    this.handleMenuClick2 = this.handleMenuClick2.bind(this);
  }

  handleMenuClick1() {
    this.setState({ pageNumber: 1 });
    this.handleDrawerClick();
  }

  handleMenuClick2() {
    this.setState({ pageNumber: 2 });
    this.handleDrawerClick();
  }

  menuControl() {
    if (this.state.pageNumber == 2) {
      return (<div><h1>Welcome to Menu 2</h1></div>);
    } else {
      return (<div><h1>Welcome to Menu 1</h1></div>);
    }
  }

  handleDrawerClick() {
    if (this.state.open == false)
      this.setState({ open: true });
    else
      this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            title="My App"
            onLeftIconButtonClick={this.handleDrawerClick.bind()}
          />

          <Drawer open={this.state.open}>
            <MenuItem onClick={this.handleMenuClick1.bind()}>Menu Item 1</MenuItem>
            <MenuItem onClick={this.handleMenuClick2.bind()}>Menu Item 2</MenuItem>
          </Drawer>

        </MuiThemeProvider>
        {this.menuControl()}
      </div>
    );
  }
}
*/

import React, { Component } from 'react';
import Navigation from './Navigation';
import firebase from './firebase';



class App extends Component {
  state = {
    authenticated: false,
  };
  componentDidMount() {
    console.log(this.state.authenticated);
    firebase.auth().onAuthStateChanged((authenticated) => {
      authenticated
        ? this.setState(() => ({
          authenticated: true,
        }))
        : this.setState(() => ({
          authenticated: false,
        }));
      console.log(this.state.authenticated);
    });
  }
  render() {
    return <Navigation authenticated={this.state.authenticated} />;
  }
}

export default App;





