import * as _ from "lodash";
import {
  getPayload,
  AppRepository,
  onFailureHandler,
  CommonStatusCode,
  CommonStatusMessage,
  PayLoadIE,
} from "../../../lib";
import { User, UserIE } from "../entity";
import { _signOut } from "../../../models/Auth/service";

export const findOneUser = async (conditions: UserIE): Promise<UserIE> => {
  const user = new User();

  try {
    return await AppRepository.User.findOne(
      {
        ...conditions,
        isDeleted: false,
      },
      user.findRole()
    );
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const findUser = async (conditions: UserIE): Promise<UserIE[]> => {
  try {
    return await AppRepository.User.find({ ...conditions, isDeleted: false });
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const createUser = async (conditions: UserIE): Promise<UserIE> => {
  try {
    return await AppRepository.User.create(conditions);
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const updateUser = async (conditions: UserIE): Promise<UserIE> => {
  try {
    const user: UserIE = await findOneUser({ userId: conditions.userId });

    if (_.isUndefined(user)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    user.userNickname = _.isEmpty(conditions.userNickname)
      ? user.userNickname
      : conditions.userNickname;
    user.userPw = _.isEmpty(conditions.userPw)
      ? user.userPw
      : conditions.userPw;

    return await AppRepository.User.save(user);
  } catch (e) {
    console.log(e);
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const removeUser = async (token: string): Promise<object> => {
  try {
    const payload: PayLoadIE = await getPayload(token);
    await updateUser({ userId: payload.userId, isDeleted: true });
    return await _signOut(token);
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const findUserProfile = async (token: string): Promise<UserIE> => {
  try {
    const payload: PayLoadIE = await getPayload(token);
    const user: UserIE = await findOneUser({ userId: payload.userId });

    return {
      userId: user.userId,
      userEmail: user.userEmail,
      userNickname: user.userNickname,
    };
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};
