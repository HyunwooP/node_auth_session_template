const fs = require('fs');

module.exports = () => {
  const models = fs.readdirSync('./controllers/');
  return models;
}