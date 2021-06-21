import * as express from "express";
import * as _ from "lodash";
import { CommonStatusCode, verifyToken } from "..";
import RouteItems, { RouteItemIE } from "./item";

export default (app: any): void => {
  RouteItems.forEach((item: RouteItemIE) => {
    app[item.method](
      item.path,
      verifyToken,
      async (req: express.Request, res: express.Response) => {
        try {
          const result = await item.next(req, res);
          console.log(
            `SUCCESS_${_.toUpper(item.method)}_${_.toUpper(item.path)}`
          );
          console.log(result);
          res.status(result.status ?? CommonStatusCode.OK);
          res.send(result);
        } catch (e) {
          console.log(
            `ERROR_${_.toUpper(item.method)}_${_.toUpper(item.path)}`
          );
          console.log(e);
          res.status(e.status ?? CommonStatusCode.BAD_REQUEST);
          res.send(e);
        }
      }
    );
  });
};
