import * as _ from "lodash";
import { RequestIE } from ".";

export default (req: RequestIE) => {
  createToken(req);
  createItem(req);
};

const createItem = (req: RequestIE) => {
  switch (req.method) {
    case "GET":
      const query: any = { ...req.query };
      req.item = query;
      break;
    case "POST":
      const body: any = { ...req.body };
      req.item = body;
      break;
  }
};

const createToken = (req: RequestIE) => {
  const token =
    !_.isEmpty(req.headers.authorization) &&
    req.headers.authorization.replace("Bearer ", "");

  req.token = token ?? "";
};
