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
    path: "/signIn",
    method: "post",
    next: Auth.signIn,
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
    method: "put",
    next: Auth.signUp,
    auth: false,
  },
  // DELETE
  {
    path: "/removeUser",
    method: "delete",
    next: User.remove,
    auth: true,
  },
  // PATCH
  {
    path: "/updateUser",
    method: "patch",
    next: User.update,
    auth: true,
  },
];

export default item;
