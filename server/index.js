/*******************************************************
 *      Server Starts From Here                        *
 *******************************************************/
'use strict';
require('dotenv').config();
const http = require('http');
const app = require('./app');
const config = require('./config/index');
const server = http.createServer(app);

app.set('PORT_NUMBER', config.appPort);

//  Start the app on the specific interface (and port).
server.listen(config.appPort, () => {
  console.log(`|  ${config.appName} started with ${config.appEnv} Environment on port ${config.appPort} at Date ${new Date()}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

module.exports = server;
