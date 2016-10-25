export const UI_UPDATE_POST = '@@discussion/UPDATE_POST';

export const createUpdatePostAction = dispatch => value => {
  return dispatch({
    type: UI_UPDATE_POST,
    payload: {
      value
    }
  });
};
