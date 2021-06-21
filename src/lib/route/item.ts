import * as Auth from "../../models/Auth/controller";
import * as User from "../../models/User/controller";
export interface RouteItemIE {
  path: string;
  method: string;
  next: Function;
  auth: boolean;
}

export default [
  // GET
  {
    path: "/getUserProfile",
    method: "get",
    next: User.findProfile,
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
