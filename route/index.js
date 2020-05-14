const fs = require('fs');

module.exports = () => {
  const models = fs.readdirSync('./model/');
  return models;
}