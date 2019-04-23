import React from 'react';
import Register from './Register';
import Signin from './Signin';
/*
const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={Login} />
      <Route path="/signup/" component={Signup} />
      <Route path="/products/" component={ProductPosts} />
      <Route path="/contact/" component={ContactCardList} />
    </div>
  </Router>
);

export default AppRouter;
*/
export default () => (
  <div>
    <Register />

  </div>
);