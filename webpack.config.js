const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const {concat} = require('lodash/fp');
const pkg = require('./package');

const hash = '[folder]__[local]___[hash:base64:5]';
const componentCSS = new ExtractTextPlugin('forum.css');

const addHMR = entries => {
  if (process.env.NODE_ENV === 'production') return entries;
  return concat(['webpack-hot-middleware/client'], entries);
};

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: NODE_ENV === 'production' || NODE_ENV === 'staging' ? false : 'eval',

  stats: {
    children: false
  },

  entry: {
    forum: addHMR([
      'babel-polyfill',
      path.join(__dirname, 'src/app/bundle')
    ])
  },
  output: {
    library: 'Forum',
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: [
        path.join(__dirname, 'src')
      ]
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(ttf|otf|eot|svg|woff)$/,
      loader: 'file-loader'
    }, {
      test: /\.css$/,
      loader: NODE_ENV === 'production' || NODE_ENV === 'staging' ? componentCSS.extract({
        fallbackLoader: 'style',
        loader: `css?minimize&modules&importLoaders=1&localIdentName=${hash}!postcss`
      }) : `style!css?minimize&modules&importLoaders=1&localIdentName=${hash}!postcss`
    }]
  },

  plugins: (() => {
    const plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(NODE_ENV)
        }
      })
    ];

    if (NODE_ENV === 'production' || NODE_ENV === 'staging')
      plugins.push(
        componentCSS,
        new webpack.BannerPlugin([pkg.name, pkg.version].join('@')),
        new CompressionPlugin({
          asset: '[path].gz',
          algorithm: 'gzip',
          regExp: /\.js$|\.css$/,
          threshold: 10240,
          minRatio: 0.8
        }),
        new webpack.LoaderOptionsPlugin({
          options: {
            postcss: {
              plugins: [autoprefixer({
                browsers: ['last 2 versions']
              })]
            },
            context: __dirname
          },
          minimize: true,
          debug: false
        }),
        new BabiliPlugin({
          comments: false,
          sourceMap: false
        })
      );
    else {
      plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      );
    }
    return plugins;
  })()
};
