import { AppRepository } from "../../../lib/database";

export const findOneUser = async (conditions: any) => {
  return await AppRepository.User.findOne(conditions);
};

export const findUser = async () => {
  return await AppRepository.User.find();
};
