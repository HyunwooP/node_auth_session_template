require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  redisPort: process.env.redisPort || 6379,
  redisHost: process.env.redisHost || '127.0.0.1',
  sessionSecret: process.env.sessionSecret,
  ttl: 3600 * 100
}