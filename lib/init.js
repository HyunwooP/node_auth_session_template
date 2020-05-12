//const https = require('https');
const http = require('http');
const port = process.env.PORT || 3000;
const express = require('./express');
const login = require('./login');

let openServer;
module.exports = () => {
  return new Promise((resolve, reject) => {
    resolve(express());
  })
  .then((server) => {
    openServer = server;
    http.createServer(server).listen(port, () => console.log(`listen port ${port}`));
  })
  .then(() => {
    openServer.post('/login', (req, res) => {
       
    })
  })
}