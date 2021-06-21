import { RequestIE, ResponseIE } from "../../../lib";
import { findOneUser, findUser, findUserProfile, updateUser } from "../service";
import { UserIE } from "../entity";

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 * @returns {UserIE}
 */
export const findOne = async (conditions: UserIE) => {
  return await findOneUser(conditions);
};

export const find = async () => {
  return await findUser();
};

export const update = async (conditions: UserIE) => {
  return await updateUser(conditions);
};
/****************************************************/

export const findProfile = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
) => {
  return await findUserProfile(req.token);
};
