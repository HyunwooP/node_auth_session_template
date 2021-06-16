import * as express from "express";
import RouteItems, { RouteItemIE } from "./item";

export default (app: any): void => {
  RouteItems.forEach((item: RouteItemIE) => {
    app[item.method](
      item.path,
      async (req: express.Request, res: express.Response) => {
        try {
          const result = await item.next(req, res);
          res.status(result.status);
          res.send(result.data);
        } catch (e) {
          res.status(e.status);
          res.send(e);
        }
      }
    );
  });
};
