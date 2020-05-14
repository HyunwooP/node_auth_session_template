const http = require('http');
const env = require('./lib/env');
const globals = require('./lib/global');
const express = require('./lib/express');

module.exports = async () => {
  
  try {
    // setting global variable
    globals();

    // setting express middlewares
    const server = await express();
    
    // create server
    http.createServer(server).listen(
      env.port,
      () => console.log(`listen port ${env.port}`)
    );
    
  } catch(e) {
    error(500, e);
  }
}