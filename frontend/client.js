import 'babel-polyfill';
import { createHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, match, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes';
import configureStore from './store';

const store = configureStore(window.__initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

// Calling `match` is simply for side effects of
// loading route/component code for the initial location
match({ routes, location }, () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app'));
});
