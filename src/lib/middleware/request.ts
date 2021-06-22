import * as _ from "lodash";
import { RequestIE } from ".";

export default (req: RequestIE) => {
  createToken(req);
  createItem(req);
};

const createItem = (req: RequestIE) => {
  switch (req.method) {
    case "GET":
      req.item = { ...req.query } ?? {};
      break;
    case "POST":
      req.item = { ...req.body } ?? {};
      break;
  }
};

const createToken = (req: RequestIE) => {
  const token = _.isArray(req.headers.token)
    ? req.headers.token[0]
    : req.headers.token;

  req.token = token ?? "";
};
