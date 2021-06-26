import { PayLoadIE, RequestIE, ResponseIE } from "../../../lib";
import {
  removeUser,
  findOneUser,
  findUser,
  findPayLoad,
  updateUser,
} from "../service";
import { UserIE } from "../entity";

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 */

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<UserIE>}
 */
export const findOne = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<UserIE> => {
  const conditions: UserIE = req.item;
  return await findOneUser(conditions);
};

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<UserIE[]>}
 */
export const find = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<UserIE[]> => {
  const conditions: UserIE = req.item;
  return await findUser(conditions);
};

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<PayLoadIE>}
 */
export const findProfile = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<PayLoadIE> => {
  return await findPayLoad(req.token);
};

/**
 * @method POST
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<UserIE>}
 */
export const update = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<UserIE> => {
  const conditions: UserIE = req.item;
  return await updateUser(conditions);
};

/**
 * @method DELETE
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<object>}
 */
export const remove = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<object> => {
  return await removeUser(req.token);
};
