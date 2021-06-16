import { StatusCode, StatusMessage } from "../lib";
import { onFailureHandler, onSuccessHandler } from "../lib/function";
import { AuthService } from "../service";

export const signIn = async (req: any, res: any, next: Function) => {
  if (!req.body.email || !req.body.password) {
    onFailureHandler({
      status: StatusCode.BAD_REQUEST,
      message: StatusMessage.BAD_REQUEST,
    });
  }

  const data = await AuthService.signIn({
    email: req.body.email,
    password: req.body.password,
  });

  return onSuccessHandler({
    status: StatusCode.OK,
    message: StatusMessage.OK,
    data,
  });
};

export const signOut = async (req: any, res: any) => {
  try {
    return res.send(await AuthService.signOut(req, res));
  } catch (e) {
    // return global.error(res, 500, e);
  }
};
