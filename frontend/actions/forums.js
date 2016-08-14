import axios from 'axios';

import config from '../config';
import ActionTypes from '../constants/ActionTypes';
import getJwtHttpHeaders from '../utils/getJwtHttpHeaders';

export function fetchForums(parentForumId) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();
      let url = `${config.backendBaseUrl}/forums/display/`;
      if (parentForumId) url = url + parentForumId + '/';
      const forums = (await axios.get(url, token ? {
        headers: getJwtHttpHeaders(token) } : {})).data.results;

      dispatch({ type: ActionTypes.FETCH_FORUMS_SUCCESS, forums });
    } catch (err) {
      let error = Error('Unknown error occured :-(. Please, try again later.');
      dispatch({ type: ActionTypes.FETCH_FORUMS_FAILURE, error });
    }
  }
}

export function fetchForumDetails(forumId) {
  return async (dispatch, getState) => {
    try {
      let forumDetails = undefined;

      if (forumId) {
        const { auth: { token } } = getState();
        let url = `${config.backendBaseUrl}/forums/${forumId}/`;
        forumDetails = (await axios.get(url, token ? {
          headers: getJwtHttpHeaders(token) } : {})).data;
      } else {
        forumDetails = null;
      }

      dispatch({ type: ActionTypes.FETCH_FORUM_DETAILS_SUCCESS, forumDetails });
    } catch (err) {
      let error = Error('Unknown error occured :-(. Please, try again later.');
      dispatch({ type: ActionTypes.FETCH_FORUM_DETAILS_FAILURE, error });
    }
  }
}
