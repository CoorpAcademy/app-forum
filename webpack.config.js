const path = require('path');
const {webpackConfig} = require('@coorpacademy/components-bundler').default;

const input = path.join(__dirname, 'src/app');
const output = path.join(__dirname, 'dist');

module.exports = webpackConfig('Forum', input, output);
