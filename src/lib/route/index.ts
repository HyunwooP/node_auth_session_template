import * as express from "express";
import * as _ from "lodash";
import { CommonStatusCode, initMiddleWare, RequestIE, ResponseIE } from "..";
import { onFailureHandler } from "../../lib/function";
import { CommonStatusMessage } from "../../lib/status";
import RouteItems, { RouteItemIE } from "./routes";

export default (app: express.Application): void => {
  RouteItems.forEach((item: RouteItemIE) => {
    app[item.method](
      item.path,
      initMiddleWare,
      async (req: RequestIE, res: ResponseIE) => {
        try {
          /**
           * 1. 해당 API가 로그인이 필요한 서비스라면, 비로그인일 시 차단
           * 2. todo: 해당 user정보를 확인 후, 관리자가 아닐 경우 forbidden 추가 (role 추가)
           */
          if (item.auth === true && _.isEmpty(req.token)) {
            onFailureHandler({
              status: CommonStatusCode.FORBIDDEN,
              message: CommonStatusMessage.FORBIDDEN,
            });
          }

          const result = await item.next(req, res);
          console.log(`SUCCESS_${_.toUpper(item.method)}_${item.path}`);
          res.status(result.status ?? CommonStatusCode.OK);
          res.send(result);
        } catch (e) {
          console.log(`ERROR_${_.toUpper(item.method)}_${item.path}`);
          console.log(e);
          res.status(e.status ?? CommonStatusCode.BAD_REQUEST);
          res.send(e);
        }
      }
    );
  });
};
