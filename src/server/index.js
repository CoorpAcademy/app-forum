const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const {pipe} = require('lodash/fp');
const config = require('./webpack.config');

const addRoot = app => {
  return app.get('/', (req, res) => {
    res.send(`
      <div id="forum"></div>
      <script async type="text/javascript" src="/dist/forum.js"></script>
    `);
  });
};

const addClient = app => {
  const compiler = webpack(config);
  return app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }),
    webpackHotMiddleware(compiler)
  );
};

module.exports = locals => {
  return pipe(
    app => {
      app.locals = locals;
      return app;
    },
    addRoot,
    addClient
  )(express());
};
