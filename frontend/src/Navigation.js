import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Home from './Home';
import LogIn from './LogIn';
import Register from './Register';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import LogOut from './LogOut';
import * as ROUTES from './constants/routes';

class Navigation extends Component {
  render() {
    return (
      <Router>
        <div>

          {this.props.authenticated ? (
            <nav>
              <NavLink to={ROUTES.DASHBOARD}>Dashboard</NavLink>
              <LogOut />
            </nav>
          ) : (
              <h1>E-Commerce App</h1>
              /*<nav>
                <NavLink to={ROUTES.LOGIN}>Log In</NavLink>
                <NavLink to={ROUTES.REGISTER}>Register</NavLink>
              </nav>*/
            )}

          <Switch>
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route authenticated={this.props.authenticated} path={ROUTES.LOGIN} component={LogIn} />
            <Route path={ROUTES.REGISTER} component={Register} />
            <ProtectedRoute authenticated={this.props.authenticated} path={ROUTES.DASHBOARD} component={Dashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Navigation;


//<NavLink to="/">Home</NavLink>