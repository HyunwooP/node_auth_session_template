const http = require('http');
const env = require('./env');
const express = require('./express');

module.exports = async () => {
  
  try {
    // setting global variable
    require('../lib/global')();

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