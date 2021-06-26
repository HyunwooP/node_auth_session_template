import * as _ from "lodash";
import {
  getPayload,
  AppRepository,
  onFailureHandler,
  CommonStatusCode,
  CommonStatusMessage,
  PayLoadIE,
} from "../../../lib";
import { UserIE } from "../entity";
import { _signOut } from "../../../models/Auth/service";

export const findOneUser = async (conditions: UserIE): Promise<UserIE> => {
  try {
    return await AppRepository.User.findOne(conditions);
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
    return await AppRepository.User.find(conditions);
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
    return await AppRepository.User.save(conditions);
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
    const user: UserIE = await findOneUser({ id: conditions.id });

    if (_.isUndefined(user)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    return await AppRepository.User.save(conditions);
  } catch (e) {
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
    await updateUser({ id: payload.id, isDeleted: true });
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
    const user: UserIE = await findOneUser({ id: payload.id });

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};
