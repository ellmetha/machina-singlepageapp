import 'babel-polyfill';
import { createHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { match, Router } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';

import routes from './routes';
import configureStore from './store';

const store = configureStore(window.__initialState);
const history = createHistory();
syncReduxAndRouter(history, store);

// Calling `match` is simply for side effects of
// loading route/component code for the initial location
match({ routes, location }, () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app'));
});
