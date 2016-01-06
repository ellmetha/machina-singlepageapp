import axios from 'axios';
import { pushPath } from 'redux-simple-router'

import config from '../config';
import ActionTypes from '../constants/ActionTypes';
import cookie from '../utils/cookie';
import getJwtTokenPayload from '../utils/getJwtTokenPayload';


function saveAuthToken(token) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookie.set({
    name: 'token',
    value: token,
    expires
  });
}

export function signin(username, password) {
  return async (dispatch, getState) => {
    try {
      const { data: { token } } = await axios.post(`${config.backendBaseUrl}/api-token-auth/`, {
        username,
        password
      });
      const payload = getJwtTokenPayload(token);

      saveAuthToken(token);
      dispatch({ type: ActionTypes.SIGNIN_SUCCESS, token, payload });
      dispatch(pushPath('/'));
    } catch (err) {
      let error = (err.status === 401)
        ? Error('Incorrect email or password')
        : Error('Unknown error occured :-(. Please, try again later.');

      dispatch({ type: ActionTypes.SIGNIN_FAILURE, error });
    }
  };
}

export function signout() {
  return (dispatch, getState) => {
    cookie.unset('token');
    dispatch({ type: ActionTypes.SIGNOUT });
    dispatch(pushPath('/'));
  };
}
