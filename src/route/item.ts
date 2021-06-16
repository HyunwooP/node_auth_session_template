import * as Auth from "../controller/auth";

export interface RouteItemIE {
  path: string;
  method: string;
  next: Function;
}

export default [
  {
    path: `/signIn`,
    method: "post",
    next: Auth.signIn,
  },
  {
    path: "/signOut",
    method: "post",
    next: Auth.signOut,
  },
];
