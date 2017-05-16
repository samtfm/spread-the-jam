import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS }
  from '../actions/session_actions';
import merge from 'lodash/merge';
const SessionReducer = (state = { currentUser: null, errors: [] }, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { currentUser: action.user });
    case RECEIVE_ERRORS:
      return merge({}, state, { errors: action.errors });
    default:
      return state;
  }
};

export default SessionReducer;
