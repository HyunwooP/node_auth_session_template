const http = require('http');
const env = require('./config/env');
const globals = require('./config/global');
const express = require('./lib/express');

module.exports = async () => {
  
  try {
    // setting global variable
    await globals();

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