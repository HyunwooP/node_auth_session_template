import * as _ from "lodash";
import { CommonStatusCode, initMiddleWare, RequestIE, ResponseIE } from "..";
import RouteItems, { RouteItemIE } from "./item";

export default (app: any): void => {
  RouteItems.forEach((item: RouteItemIE) => {
    app[item.method](
      item.path,
      initMiddleWare,
      async (req: RequestIE, res: ResponseIE) => {
        try {
          const result = await item.next(req, res);
          console.log(`SUCCESS_${_.toUpper(item.method)}_${item.path}`);
          res.status(result.status ?? CommonStatusCode.OK);
          res.send(result);
        } catch (e) {
          console.log(`ERROR_${_.toUpper(item.method)}_${item.path}`);
          res.status(e.status ?? CommonStatusCode.BAD_REQUEST);
          res.send(e);
        }
      }
    );
  });
};
