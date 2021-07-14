import { UserIE } from "../../../models/User/entity";
import { RequestIE, ResponseIE } from "../../../lib";
import { _signUp, _signOut, _signInUser, _signInAdmin } from "../service";

/**
 * @method POST
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<UserIE>}
 */
export const signInUser = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<UserIE> => {
  const conditions: UserIE = req.item;
  return await _signInUser(conditions);
};

/**
 * @method POST
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<UserIE>}
 */
export const signInAdmin = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<UserIE> => {
  const conditions: UserIE = req.item;
  return await _signInAdmin(conditions);
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
