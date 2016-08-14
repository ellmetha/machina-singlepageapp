import ActionTypes from '../constants/ActionTypes';

const initialState = {
  error: null,
  list: [],
  items: {},
  details: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_FORUMS_SUCCESS:
      const list = action.forums.map(item => item.id);
      const items = {};

      action.forums.forEach(forum => { items[forum.id] = forum; });
      return { ...state, list, items };

    case ActionTypes.FETCH_FORUM_DETAILS_SUCCESS:
        return { ...state, details: action.forumDetails };

    case ActionTypes.FETCH_FORUMS_FAILURE:
    case ActionTypes.FETCH_FORUM_DETAILS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};
