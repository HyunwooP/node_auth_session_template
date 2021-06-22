import * as express from "express";
import { checkToken, payloadToken, createToken } from "./jwt";
import generateRequest from "./request";
import generateResponse from "./response";
interface RequestIE extends express.Request {
  token: string;
  item: any;
}

interface ResponseIE extends express.Response {}

const initMiddleWare = (req: RequestIE, res: ResponseIE, next: Function) => {
  generateRequest(req);
  generateResponse(res);
  checkToken(req, res, next);
};

export {
  // COMMON
  RequestIE,
  ResponseIE,
  initMiddleWare,
  // JWT
  checkToken,
  payloadToken,
  createToken,
};
