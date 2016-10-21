import includes from 'lodash/fp/includes';
import set from 'lodash/fp/set';
import {combineReducers} from 'redux';
import {DISCUSSION_FETCH_SUCCESS} from '../actions/fetch-discussion-api';
import {CREATE_THREAD_SUCCESS} from '../actions/create-thread-api';

const discussions = (state = {}, action) => {
  if (includes(action.type, [DISCUSSION_FETCH_SUCCESS])) {
    return set(['threads'], action.payload.threads, state);
  }

  return state;
};

const threadCreated = (state = {}, action) => {
  if (includes(action.type, [CREATE_THREAD_SUCCESS])) {
    state.threads.push(action.payload);
  }

  return state;
};

export default combineReducers({
  discussions,
  threadCreated
});
