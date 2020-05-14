const login = require('./login');
const logout = require('./logout');

module.exports = {
  login: (req, res) => login(req, res),
  logout: (req, res) => logout(req, res),
}