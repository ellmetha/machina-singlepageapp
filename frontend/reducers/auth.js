import ActionTypes from '../constants/ActionTypes';

const initialState = {
  error: null,
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        error: null,
        token: action.token,
        user: action.payload
      };

    case ActionTypes.SIGNUP_FAILURE:
    case ActionTypes.SIGNIN_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case ActionTypes.SIGNOUT:
      return { ...initialState };
    default:
      return state;
  }
};
