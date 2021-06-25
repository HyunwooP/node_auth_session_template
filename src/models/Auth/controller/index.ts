import { UserIE } from "../../../models/User/entity";
import { RequestIE, ResponseIE } from "../../../lib";
import { _signIn, _signUp, _signOut } from "../service";

/**
 * @method POST
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 */
export const signIn = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
) => {
  const conditions: UserIE = req.item;
  return await _signIn(conditions);
};

/**
 * @method PUT
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 */
export const signUp = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
) => {
  const conditions: UserIE = req.item;
  return await _signUp(conditions);
};

/**
 * @method POST
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 */
export const signOut = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
) => {
  const conditions: string = req.token;
  return await _signOut(conditions);
};
