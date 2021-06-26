import { UserIE } from "../../../models/User/entity";
import { RequestIE, ResponseIE } from "../../../lib";
import { _signIn, _signUp, _signOut } from "../service";

/**
 * @method POST
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<UserIE>}
 */
export const signIn = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<UserIE> => {
  const conditions: UserIE = req.item;
  return await _signIn(conditions);
};

/**
 * @method PUT
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<UserIE>}
 */
export const signUp = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<UserIE> => {
  const conditions: UserIE = req.item;
  return await _signUp(conditions);
};

/**
 * @method POST
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<object>}
 */
export const signOut = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<object> => {
  const conditions: string = req.token;
  return await _signOut(conditions);
};
