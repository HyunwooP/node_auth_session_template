import { RouteItemIE } from "lib/route/routes";
import * as Common from "../../../../models/Common/controller";

const CommonRoute: RouteItemIE[] = [
  // GET
  {
    path: "/health",
    method: "get",
    next: Common.health,
    auth: false,
  },
  {
    path: "/findDashboardCount",
    method: "get",
    next: Common.findDashboardCount,
    auth: true,
  },
];

export default CommonRoute;
