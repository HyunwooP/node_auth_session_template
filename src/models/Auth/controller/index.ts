import { UserIE } from "../../../models/User/entity";
import { RequestIE, ResponseIE } from "../../../lib";
import { _signIn, _signUp, _signOut } from "../service";

export const signIn = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
) => {
  const conditions: UserIE = req.item;
  return await _signIn(conditions);
};

export const signUp = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
) => {
  const conditions: UserIE = req.item;
  return await _signUp(conditions);
};

export const signOut = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
) => {
  const conditions: string = req.token;
  return await _signOut(conditions);
};
