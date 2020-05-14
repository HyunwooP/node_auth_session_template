module.exports = (req) => {
  return new Promise((resolve) => {
    req.logout();
    req.session.destroy();
    resolve('Logout complete!');
  });
}