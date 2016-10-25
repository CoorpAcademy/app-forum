import includes from 'lodash/fp/includes';
import {combineReducers} from 'redux';
import {UI_UPDATE_POST} from '../../actions/ui-update-post';

const postUpdated = (state = {}, action) => {
  if (includes(action.type, [UI_UPDATE_POST])) {
    state.value = action.payload.value;
    state.postDisabled = state.value.trim().length === 0;
  }

  return state;
};

export default combineReducers({
  postUpdated
});
