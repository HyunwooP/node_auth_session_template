import { RequestIE, ResponseIE } from "../../../lib";
import { findContents, findOneContents, updateContents } from "../service";
import { ContentsIE } from "../entity";

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 * @returns {ContentsIE}
 */
export const findOne = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
) => {
  const conditions: ContentsIE = req.item;
  return await findOneContents(conditions);
};

export const find = async (req: RequestIE, res: ResponseIE, next: Function) => {
  const conditions: ContentsIE = req.item;
  return await findContents(conditions);
};

export const update = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
) => {
  const conditions: ContentsIE = req.item;
  return await updateContents(conditions);
};
/****************************************************/
