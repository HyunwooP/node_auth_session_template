import * as Auth from "../../models/Auth/controller";

export interface RouteItemIE {
  path: string;
  method: string;
  next: Function;
  auth: boolean;
}

export default [
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
