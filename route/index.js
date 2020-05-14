const fs = require('fs');

module.exports = () => {
  const controllers = fs.readdirSync('./controllers/');
  return controllers;
}