import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import forumsReducer from './forums';

export default combineReducers({
  auth: authReducer,
  forums: forumsReducer,
  routing: routerReducer
});
