import CommonRoute from "./items/Common";
import AuthRoute from "./items/Auth";
import UserRoute from "./items/User";
import ContentsRoute from "./items/Contents";
export interface RouteItemIE {
  path: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  next: Function;
  auth: boolean;
}

const item: RouteItemIE[] = [
  ...CommonRoute,
  ...AuthRoute,
  ...UserRoute,
  ...ContentsRoute,
];

export default item;
