import constant from 'lodash/fp/constant';
import find from 'lodash/fp/find';
import get from 'lodash/fp/get';
import isString from 'lodash/fp/isString';
import map from 'lodash/fp/map';
import pathMatch from 'path-match';
import {NAVIGATE} from '@coorpacademy/redux-history';
import createDiscussionView from './views/discussion';
import {fetchDiscussionAction} from './actions/fetch-discussion-api';

export const createRoutes = options => [{
  path: '/',
  view: createDiscussionView(options),
  actions: [
    fetchDiscussionAction(options)
  ]
}];

const createMatch = pathMatch({
  sensitive: false,
  strict: false,
  end: false
});

export const createRouter = (...argz) => {
  const routes = map(({path, view}) => ({
    match: isString(path) ? createMatch(path) : path,
    view
  }), createRoutes(...argz));

  return ({pathname} = {}) => {
    const {match, view} = find(route => route.match(pathname), routes);
    const params = match(pathname);
    return {
      params,
      view
    };
  };
};

export const createRouterMiddleware = (...argz) => {
  const routes = map(({path, actions}) => ({
    match: isString(path) ? createMatch(path) : path,
    actions
  }), createRoutes(...argz));

  return store => next => action => {
    if (action.type === NAVIGATE) {
      const pathname = get(['payload', 'pathname'], action);

      const {match, actions} = find(route => route.match(pathname), routes);
      const params = match(pathname);

      return Promise.all(
        map(_action => _action(store.dispatch, params), actions)
      ).then(constant(next(action)));
    }

    return next(action);
  };
};
