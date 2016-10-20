import {createStore} from 'redux';
import get from 'lodash/fp/get';
import {render} from '@coorpacademy/treantjs-engine-virtual-dom';
import {connectHistory, navigate} from '@coorpacademy/redux-history';
import {Observable} from 'rxjs';
import {createHistory} from 'history';
import identity from 'lodash/fp/identity';
import createReducer from './reducers';
import createMiddleware from './middleware';
import {createRouter} from './router';

const createRenderer = (store, history, update, _createRouter, options) => {
  const state$ = Observable.create(observer =>
    store.subscribe(() =>
      observer.next(store.getState())
    )
  ).startWith(store.getState());

  const Router = _createRouter({
    ...options,
    dispatch: store.dispatch,
    history,
    translate: identity
  });

  const view$ = state$.map(state => {
    const {params, view} = Router(get('route', state));
    return view({
      state,
      params
    });
  });

  const subscription = view$
    .map(update)
    .subscribe();

  if (module.hot) {
    module.hot.accept('./router.js', () => {
      subscription.unsubscribe();
      createRenderer(store, history, update, require('./router').createRouter, options);
    });
  }
};

export default options => {
  const history = createHistory();

  const store = createStore(
    createReducer(),
    createMiddleware(options)
  );

  const unconnectHistory = connectHistory(history, store);
  store.dispatch(navigate(history.getCurrentLocation()));

  const update = render(options.container);
  createRenderer(store, history, update, createRouter, options);

  if (module.hot) {
    module.hot.accept('./reducers/index.js', () => {
      const reducers = require('./reducers');

      store.replaceReducer(reducers.createReducer());
    });
  }

  return () => {
    unconnectHistory();
  };
};
