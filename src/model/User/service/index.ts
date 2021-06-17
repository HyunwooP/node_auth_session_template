import { AppRepository } from "../../../lib/database";
import { User, UserIE } from "../entity";

export const findOneUser = async (conditions: UserIE) => {
  return await AppRepository.User.findOne(conditions);
};

export const findUser = async () => {
  return await AppRepository.User.find();
};

export const updateUser = async (conditions: UserIE) => {
  const user = new User();

  user.email = conditions.email;
  user.nickname = conditions.nickname;
  user.password = conditions.password;

  return await AppRepository.User.save(user);
};
