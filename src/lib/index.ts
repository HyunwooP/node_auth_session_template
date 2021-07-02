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
  getPayload,
  PayLoadIE,
} from "./middleware";
import createRoute from "./route";
import { getAPI, deleteAPI, patchAPI, putAPI, postAPI } from "./ajax";

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
  getPayload,
  PayLoadIE,
  // ajax
  getAPI,
  deleteAPI,
  patchAPI,
  putAPI,
  postAPI,
};
