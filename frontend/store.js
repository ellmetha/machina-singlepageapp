import { createHistory, createMemoryHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

//
// Register Thunk middleware in order to allow action creators to return
// functions instead of action objects.
// -----------------------------------------------------------------------------
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  ...((process.env.NODE_ENV !== 'production' && process.env.BROWSER) ? [
    createLogger() ] : []),
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
