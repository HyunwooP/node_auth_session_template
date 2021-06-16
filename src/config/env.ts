import "dotenv/config";

export default {
  node: process.env.node || "test",
  // react port를 3000으로 준다.
  port: process.env.port || 3001,
  // redis
  redisPort: process.env.redisPort || 6379,
  redisHost: process.env.redisHost || "127.0.0.1",
  // mysql
  mysqlPort: process.env.mysqlPort || 3306,
  mysqlHost: process.env.mysqlHost || "127.0.0.1",
  // jwt
  jwtSecret: process.env.jwtSecret || "secret",
  origin:
    `http://${process.env.clientDomain}:${process.env.clientPort}` ||
    "http://localhost:3000",
};
