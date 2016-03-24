import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import ForumTree from './components/ForumTree';
import SignIn from './components/SignIn';

export default (
  <Route component={App}>
    <Route path='/' component={ForumTree} />
    <Route path='forum/:id' component={ForumTree} />
    <Route path='signin' component={SignIn} />
  </Route>
);
