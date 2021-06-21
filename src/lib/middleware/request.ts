import * as _ from "lodash";
import { RequestIE } from ".";

export default (req: RequestIE) => {
  const token = _.isArray(req.headers.token)
    ? req.headers.token[0]
    : req.headers.token;

  req.token = token;
};
