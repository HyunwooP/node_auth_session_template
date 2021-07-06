import "dotenv/config";

/**
 * 외부에 노출되는 데이터들이기 때문에 주의해서 사용해야 한다.
 */
export default {
  // "dev" | "production"
  node: process.env.node ?? "dev",
  // react port를 3000으로 준다.
  port: process.env.port ?? 3001,
  // redis
  redisPort: process.env.redisPort ?? 6379,
  redisHost: process.env.redisHost ?? "127.0.0.1",
  // mysql
  mysqlPort: process.env.mysqlPort ?? 3306,
  mysqlHost: process.env.mysqlHost ?? "127.0.0.1",
  mysqlPassword: process.env.mysqlPassword ?? "",
  // jwt
  jwtSecret: process.env.jwtSecret ?? "secret",
  jwtExpired: process.env.jwtExpired ?? "1h",
  jwtRefreshExpired: process.env.jwtRefreshExpired ?? "3h",
  // domain
  origin:
    process.env.clientDomain && process.env.clientPort
      ? `http://${process.env.clientDomain}:${process.env.clientPort}`
      : "http://localhost:8080",
};
