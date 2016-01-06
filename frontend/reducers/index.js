import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import authReducer from './auth';
import forumsReducer from './forums';

export default combineReducers({
  auth: authReducer,
  forums: forumsReducer,
  routing: routeReducer
});
