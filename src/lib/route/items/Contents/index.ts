import { RouteItemIE } from "lib/route/routes";
import * as Contents from "../../../../models/Contents/controller";

const ContentsRoute: RouteItemIE[] = [
  // GET
  {
    path: "/findContentsCount",
    method: "get",
    next: Contents.findCount,
    auth: true,
  },
  {
    path: "/findContents",
    method: "get",
    next: Contents.find,
    auth: false,
  },
];

export default ContentsRoute;
