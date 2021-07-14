import * as Common from "../../models/Common/controller";
import * as Auth from "../../models/Auth/controller";
import * as User from "../../models/User/controller";
import * as Contents from "../../models/Contents/controller";

export interface RouteItemIE {
  path: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  next: Function;
  auth: boolean;
}

const item: RouteItemIE[] = [
  // GET
  {
    path: "/health",
    method: "get",
    next: Common.health,
    auth: false,
  },
  {
    path: "/findUser",
    method: "get",
    next: User.find,
    auth: true,
  },
  {
    path: "/findUserProfile",
    method: "get",
    next: User.findProfile,
    auth: true,
  },
  {
    path: "/findContents",
    method: "get",
    next: Contents.find,
    auth: false,
  },
  // POST
  {
    path: "/signInUser",
    method: "post",
    next: Auth.signInUser,
    auth: false,
  },
  {
    path: "/signInAdmin",
    method: "post",
    next: Auth.signInAdmin,
    auth: false,
  },
  {
    path: "/signOut",
    method: "post",
    next: Auth.signOut,
    auth: true,
  },
  // PUT
  {
    path: "/signUp",
    // Client -> Node Server
    // method: "put",
    // Spring -> Node Server (https://stackoverflow.com/questions/25163131/httpurlconnection-invalid-http-method-patch)
    method: "post",
    next: Auth.signUp,
    auth: false,
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

export default item;
