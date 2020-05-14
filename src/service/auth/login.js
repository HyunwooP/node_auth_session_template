const passport = require('../../lib/passport');

module.exports = (req, res) => {
  return new Promise((resolve, reject) => {

    const handler = (err, user, message) => {
      if (err) {
        reject(err);
      }

      // 로그인 프로세스는 여기에 정의한다.
      /**
       * if (crypto(req.body.password) === user.password) {
       *  
       * }
       */
      
      // passort.js create session
      req.logIn(user, (err) => {
        if (err) reject('Create Session Failed');
        req.session.authenticated = true;
        req.session.user = user;
        resolve(user);
      });
    }

    passport.authenticate('local', handler)(req, res, req.next);
    
  });
}