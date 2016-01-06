import ActionTypes from '../constants/ActionTypes';

const initialState = {
  error: null,
  list: [],
  items: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_FORUMS_SUCCESS:
      const list = action.forums.map(item => item.id);
      const items = {};

      action.forums.forEach(forum => { items[forum.id] = forum; });
      return { list, items };

    case ActionTypes.FETCH_FORUMS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};
