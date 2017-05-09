import prepareApp from '@coorpacademy/appster/src/app';
import createReducer from './reducers';
import createRoutes from './routes';

module.exports.create = options => {
  const app = prepareApp(createReducer, createRoutes, options);
  const {store, unconnectHistory} = app;

  if (module.hot) {
    module.hot.accept('./reducers/index.js', () => {
      store.replaceReducer(require('./reducers').createReducer());
    });
  }

  return unconnectHistory;
};
