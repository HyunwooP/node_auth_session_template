import { RequestIE, ResponseIE } from "../../../lib";
import { findOneUser, findUser, findUserProfile, updateUser } from "../service";
import { UserIE } from "../entity";

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 * @returns {UserIE}
 */

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 */
export const findOne = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
) => {
  const conditions: UserIE = req.item;
  return await findOneUser(conditions);
};

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 */
export const find = async (req: RequestIE, res: ResponseIE, next: Function) => {
  const conditions: UserIE = req.item;
  return await findUser(conditions);
};

/**
 * @method POST
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 */
export const update = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
) => {
  const conditions: UserIE = req.item;
  return await updateUser(conditions);
};

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 */
export const findProfile = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
) => {
  return await findUserProfile(req.token);
};
