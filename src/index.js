const pkg = require('../package.json');
const createServer = require('./server');
const config = require('./config');

const app = createServer(config);

if (!module.parent) {
  const PORT = config.port;
  const ENV = config.env;

  process.on('uncaughtException', err => {
    // eslint-disable-next-line no-console
    console.error('uncaughtException', err.stack || err);
    process.exit(1);
  });

  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.info(`open ${pkg.name} on : http://localhost:${PORT} | env:${ENV}`));
}

module.exports = app;
