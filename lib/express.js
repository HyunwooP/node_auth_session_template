const app = require('express')();
const bodyParser = require('body-parser');
const helmet = require('helmet');

module.exports = () => {
  return new Promise((resolve, reject) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(helmet());
    resolve(app);
  })
}