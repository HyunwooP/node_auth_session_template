import { RequestIE, ResponseIE } from "../../../lib";
import { _signIn, _signUp, _signOut } from "../service";

export const signIn = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
) => {
  return await _signIn({ email: req.body.email, password: req.body.password });
};

export const signUp = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
) => {
  return await _signUp({
    email: req.body.email,
    password: req.body.password,
    nickname: req.body.nickname,
  });
};

export const signOut = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
) => {
  return await _signOut(req.token);
};
