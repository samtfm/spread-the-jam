import { RECEIVE_EVENTS } from '../actions/event_actions';
import { RECEIVE_REGISTRATION, REMOVE_REGISTRATION } from '../actions/registration_actions';

import {merge, pick, mapValues} from 'lodash';

const EventsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);
  const {userId, eventId} = action.registration ? action.registration : {};
  switch (action.type) {
    case RECEIVE_REGISTRATION:
      newState[eventId].attendees[userId] = true;
      return newState;
    case REMOVE_REGISTRATION:
      newState[eventId].attendees[userId] = null;
      return newState;
    case RECEIVE_EVENTS:
      const keys = ['id', 'dateTime', 'address', 'description', 'hostId', 'cityId', 'attendees'];
      const events = mapValues(action.events, event => pick(event, keys));
      return merge({}, state, events);
    default:
      return state;
  }
};


export default EventsReducer;
