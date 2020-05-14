const http = require('http');
const env = require('./env');
const express = require('./express');

module.exports = async () => {
  
  try {
    // setting express middlewares
    const server = await express();
    
    // create server
    http.createServer(server).listen(
      env.port,
      () => console.log(`listen port ${env.port}`)
    );
    
  } catch(e) {
    console.error(`Server Error ==============> ${e}`);
  }
}