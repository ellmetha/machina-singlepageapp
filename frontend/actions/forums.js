import axios from 'axios';

import config from '../config';
import ActionTypes from '../constants/ActionTypes';
import getJwtHttpHeaders from '../utils/getJwtHttpHeaders';

export function fetchForums() {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();
      const forums = (await axios.get(`${config.backendBaseUrl}/forums/`, token ? {
        headers: getJwtHttpHeaders(token) } : {})).data.results;

      dispatch({ type: ActionTypes.FETCH_FORUMS_SUCCESS, forums });
    } catch (err) {
      let error = Error('Unknown error occured :-(. Please, try again later.');
      dispatch({ type: ActionTypes.FETCH_FORUMS_FAILURE, error });
    }
  }
}
