import includes from 'lodash/fp/includes';
import set from 'lodash/fp/set';
import {DISCUSSION_FETCH_SUCCESS} from '../actions/fetch-discussion-api';

export default (state = {}, action) => {
  if (includes(action.type, [DISCUSSION_FETCH_SUCCESS])) {
    return set(['threads'], action.payload.threads, state);
  }

  return state;
};
