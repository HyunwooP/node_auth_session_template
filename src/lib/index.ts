import { onFailureHandler } from "./function";
import { CommonStatusCode, CommonStatusMessage } from "./status";
import {
  AppRepository,
  connectMysql,
  connectRepository,
  generateTestData,
} from "./database/mysql";
import Redis from "./database/redis";
import { createServer } from "./server";
import { createExpress } from "./express";
import {
  initMiddleWare,
  RequestIE,
  ResponseIE,
  payloadToken,
  createToken,
  checkToken,
} from "./middleware";
import createRoute from "./route";

export {
  // server
  createExpress,
  createServer,
  createRoute,
  // common function
  onFailureHandler,
  // common status
  CommonStatusCode,
  CommonStatusMessage,
  // database
  connectMysql,
  Redis,
  AppRepository,
  connectRepository,
  generateTestData, // example
  // middleware
  initMiddleWare,
  RequestIE,
  ResponseIE,
  payloadToken,
  createToken,
  checkToken,
};
