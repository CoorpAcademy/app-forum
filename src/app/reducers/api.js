import includes from 'lodash/fp/includes';
import set from 'lodash/fp/set';

export default (state = {}, action) => {
  if (includes(action.type, [BRAND_FETCH_SUCCESS, BRAND_SAVE_SUCCESS])) {
    const {id} = action.meta;
    return set(['entities', 'brands', id], action.payload, state);
  }

  return state;
};
