import * as Auth from "../../model/Auth/controller";

export interface RouteItemIE {
  path: string;
  method: string;
  next: Function;
  auth: boolean;
  role: string; // 혹시 몰라서 확장
}

export default [
  {
    path: "/signIn",
    method: "post",
    next: Auth.signIn,
    auth: false,
    role: "ALL",
  },
  {
    path: "/signOut",
    method: "post",
    next: Auth.signOut,
    auth: true,
    role: "ALL",
  },
];
