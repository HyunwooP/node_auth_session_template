import { UserIE } from "../entity";
import { findOneUser, findUser, updateUser } from "../service";

export const findOne = async (conditions: UserIE) => {
  return await findOneUser(conditions);
};

export const find = async () => {
  return await findUser();
};

export const update = async (conditions: UserIE) => {
  return await updateUser(conditions);
};
