/* eslint-disable no-console, prefer-template */
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev');
const open = require('open');

new WebpackDevServer(webpack(config), config.serverConfig)
.listen(config.serverConfig.port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + config.serverConfig.port);
  console.log('Opening your system browser...');
  open('http://localhost:' + config.serverConfig.port + '/webpack-dev-server/');
});
