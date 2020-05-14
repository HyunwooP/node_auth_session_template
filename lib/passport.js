const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const serializeUser = (user, cb) => {
  return cb(null, user);
}

const deserializeUser = (user, cb) => {
  /**
   * User.findById(_id, (err, user) => {
   *  if (err) return next(err);
   *  return next(null, user || null);
   * })
   */
  return cb(null, user || null);
}

const strategy = (req, id, password, cb) =>  {
  // DB 데이터와 비교 검증 해야하는 구간
  /**
   * User.findById(id, (user) => {
   *  if (!user) create or throw error
   *  if (user.id === id) return cb(null, user);
   *  else return cb(null, null) or throw error;
   * })
   */
  return cb(null, { id });
}

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(new LocalStrategy(
  {
    usernameField: 'id',
    passReqToCallback: true
  },
  (req, id, password, cb) => strategy(req, id, password, cb)
));

module.exports = passport;