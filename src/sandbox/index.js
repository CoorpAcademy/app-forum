const path = require('path');
const config = require('./config');
const runServer = require('@coorpacademy/appster/src/server');
const input = path.join(__dirname, '../app');

const addSandbox = app => {
  return app.get('/', (req, res) => {
    res.send(`
      <div id="forum"></div>
      <script type="text/javascript" src="/dist/forum.js"></script>
      <script>
        Forum.create({
          container: document.getElementById('forum'),
          channel: 'frcoorpacademy/discipline/15/module/15.B-development',
          api: 'http://localhost:3000/api/v1'
        });
      </script>
    `);
  });
};

runServer('Forum', config, input, addSandbox);
