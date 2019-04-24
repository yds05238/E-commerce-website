import React from 'react';
import Register from './Register';
import Signin from './Signin';
import Sale from './Sale';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={Signin} />
      <Route path="/register/" component={Register} />
      <Route path="/sale/" component={Sale} />
    </div>
  </Router>
);

export default AppRouter;
