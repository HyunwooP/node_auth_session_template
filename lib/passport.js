const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

function serializeUser(user, cb) {
  return cb(null, user);
}

function deserializeUser(user, cb) {
  // DB 데이터와 비교 검증 해야하는 구간
  return cb(user, cb);
}

function strategy(req, id, password, cb) {
  // DB 데이터와 비교 검증 해야하는 구간
  return cb(null, { id });
}

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(new LocalStrategy(
  {
    usernameField: 'id',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, id, password, cb) => strategy(req, id, password, cb)
));

module.exports = passport;