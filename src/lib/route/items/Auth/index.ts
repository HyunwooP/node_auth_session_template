import { RouteItemIE } from "lib/route/routes";
import * as Auth from "../../../../models/Auth/controller";

const AuthRoute: RouteItemIE[] = [
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
];

export default AuthRoute;
