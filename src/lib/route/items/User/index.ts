import { RouteItemIE } from "lib/route/routes";
import * as User from "../../../../models/User/controller";

const UserRoute: RouteItemIE[] = [
  // GET
  {
    path: "/findUser",
    method: "get",
    next: User.find,
    auth: true,
  },
  {
    path: "/findUserCount",
    method: "get",
    next: User.findCount,
    auth: true,
  },
  {
    path: "/findUserProfile",
    method: "get",
    next: User.findProfile,
    auth: true,
  },
  // PATCH
  {
    path: "/updateUser",
    // Client -> Node Server
    // method: "patch",
    // Spring -> Node Server (https://stackoverflow.com/questions/25163131/httpurlconnection-invalid-http-method-patch)
    method: "post",
    next: User.update,
    auth: true,
  },
  // DELETE
  {
    path: "/removeUser",
    method: "delete",
    next: User.remove,
    auth: true,
  },
];

export default UserRoute;
