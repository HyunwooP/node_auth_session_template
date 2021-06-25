import * as _ from "lodash";
import { RequestIE } from ".";

export default (req: RequestIE): void => {
  Promise.all([createToken(req), createItem(req)]).catch((e) =>
    console.log("Generate Middleware Failed", e)
  );
};

const createItem = (req: RequestIE): void => {
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

const createToken = (req: RequestIE): void => {
  const token =
    !_.isEmpty(req.headers.authorization) &&
    req.headers.authorization.replace("Bearer ", "");

  req.token = token ?? "";
};
