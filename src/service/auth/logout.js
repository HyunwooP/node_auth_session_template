module.exports = (req) => {
  return new Promise((resolve, reject) => {
    
    if (!req.logout || !req.session) {
      reject('Can not find Session');
    }

    req.logout();
    req.session.destroy();
    resolve('Logout complete!');
  });
}