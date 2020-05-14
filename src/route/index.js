const fs = require('fs');

module.exports = () => {
  const controllers = fs.readdirSync('./src/controllers/');

  return controllers;
}