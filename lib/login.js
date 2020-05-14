const passport = require('./passport');
const _ = require('lodash');

module.exports = (req, res) => {
  return new Promise((resolve, reject) => {
    
    if (_.isEmpty(req.body.id) ||  _.isEmpty(req.body.password)) {
      reject('missing auth params');
    }

    passport.authenticate('local', handler)(req, res, req.next);

    function handler(err, user, message) {
      if (err) {
        reject(err);
      }

      // 로그인 프로세스는 여기에 정의한다.
      
      resolve(user);
    }
  });
}