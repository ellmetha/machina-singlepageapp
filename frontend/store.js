import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

//
// Register Thunk middleware in order to allow action creators to return
// functions instead of action objects.
// -----------------------------------------------------------------------------
export default function configureStore(initialState, history) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      ...((history !== undefined) ? [routerMiddleware(history)] : []),
      ...((process.env.NODE_ENV !== 'production' && process.env.BROWSER) ? [
        createLogger() ] : []),
    ),
  );
};
