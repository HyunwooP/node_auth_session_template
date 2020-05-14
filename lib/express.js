const app = require('express')();
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('./passport');
const env = require('./env');

const sessionConfig = {
  secret: env.sessionSecret,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null,
  },
  store: new redisStore({
    client: redis.createClient(env.redisPort, env.redisHost)
  }),
  resave: false,
  saveUninitialized: false
};

module.exports = () => {
  return new Promise((resolve) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(helmet());
    app.use(session(sessionConfig));
    app.use(passport.initialize());
    app.use(passport.session());
    resolve(app);
  });
}