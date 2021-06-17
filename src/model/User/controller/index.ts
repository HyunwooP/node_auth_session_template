import { findOneUser, findUser } from "../service";

export const findOne = async (conditions: any) => {
  return await findOneUser(conditions);
};

export const find = async () => {
  return await findUser();
};
