const path = require('path');
const config = require('@coorpacademy/appster/webpack.config');

const input = path.join(__dirname, 'src/app');
const output = path.join(__dirname, 'dist');

module.exports = config('Forum', input, output);

