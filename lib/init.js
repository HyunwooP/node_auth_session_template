//const https = require('https');
const http = require('http');
const env = require('./env');
const express = require('./express');
const login = require('./login');
const logout = require('./logout');

let openServer;
module.exports = () => {
  // express init
  return new Promise((resolve) => {
    resolve(express());
  })
  // create server
  .then((server) => {
    openServer = server;
    http.createServer(server).listen(
      env.port,
      () => console.log(`listen port ${env.port}`)
    );
  })
  .then(() => {
    // login process start
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
  
    // logout process start
    openServer.post('/logout', (req, res) => {
      logout(req, res)
      .then(user => {
        return res.status(200).send(user);
      })
      .catch((err) => {
        console.log(err);
        // todo: create error status list!
        return res.status(500).send(err);
      });
   })
  })
}