import * as Auth from "../../models/Auth/controller";
import * as User from "../../models/User/controller";
import * as Contents from "../../models/Contents/controller";
export interface RouteItemIE {
  path: string;
  method: string;
  next: Function;
  auth: boolean;
}

export default [
  // GET
  {
    path: "/findUserProfile",
    method: "get",
    next: User.findProfile,
    auth: false,
  },
  {
    path: "/findContents",
    method: "get",
    next: Contents.find,
    auth: false,
  },
  // POST
  {
    path: "/signIn",
    method: "post",
    next: Auth.signIn,
    auth: false,
  },
  {
    path: "/signOut",
    method: "post",
    next: Auth.signOut,
    auth: false,
  },
  {
    path: "/signUp",
    method: "post",
    next: Auth.signUp,
    auth: true,
  },
];
