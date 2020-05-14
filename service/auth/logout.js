const passport = require('../../lib/passport');

module.exports = (req) => {
  return new Promise((resolve) => {
    req.logout();
    req.session.destroy();
    resolve('logout complete!');
  });
}