import {combineReducers} from 'redux';
import {historyReducer} from '@coorpacademy/redux-history';
// import api from './api';
// import ui from './ui';

const route = (state, action) => {
  return historyReducer(state, action);
};

export default ({lang} = {}) => combineReducers({
  // api,
  // ui,
  route
});
