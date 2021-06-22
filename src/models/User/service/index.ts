import { payloadToken, AppRepository } from "../../../lib";
import { User, UserIE } from "../entity";

export const findOneUser = async (conditions: UserIE) => {
  return await AppRepository.User.findOne(conditions);
};

export const findUser = async (conditions: UserIE) => {
  return await AppRepository.User.find(conditions);
};

export const updateUser = async (conditions: UserIE) => {
  const user = new User();

  user.email = conditions.email;
  user.nickname = conditions.nickname;
  user.password = conditions.password;

  return await AppRepository.User.save(user);
};

export const findUserProfile = async (token: string) => {
  const payload: any = payloadToken(token);

  return {
    email: payload.email,
    nickname: payload.nickname,
  };
};
