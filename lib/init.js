//const https = require('https');
const http = require('http');
const env = require('./env');
const express = require('./express');
const login = require('./login');

let openServer;
module.exports = () => {
  // express init
  return new Promise((resolve, reject) => {
    resolve(express());
  })
  // create server
  .then((server) => {
    openServer = server;
    http.createServer(server).listen(env.port, () => console.log(`listen port ${env.port}`));
  })
  // login process start
  .then(() => {
    openServer.post('/login', (req, res) => {
       login(req, res)
       .then(user => {
         return res.status(200).send(user);
       })
       .catch((err) => {
         console.log(err)
        // todo: create error status list!
        return res.status(500).send(err);
       });
    })
  })
}