import { RequestIE, ResponseIE } from "../../../lib";
import {
  findContents,
  findOneContents,
  removeContents,
  updateContents,
} from "../service";
import { ContentsIE } from "../entity";

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 * @returns {ContentsIE}
 */

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<ContentsIE>}
 */
export const findOne = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<ContentsIE> => {
  const conditions: ContentsIE = req.item;
  return await findOneContents(conditions);
};

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<ContentsIE[]>}
 */
export const find = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<ContentsIE[]> => {
  const conditions: ContentsIE = req.item;
  return await findContents(conditions);
};

/**
 * @method POST
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<ContentsIE>}
 */
export const update = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<ContentsIE> => {
  const conditions: ContentsIE = req.item;
  return await updateContents(conditions);
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
  const conditions: ContentsIE = req.item;
  return await removeContents(conditions);
};
