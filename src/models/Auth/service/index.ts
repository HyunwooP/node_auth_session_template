import * as _ from "lodash";

import { findOneUser, updateUser } from "../../../models/User/service";
import { UserIE } from "../../User/entity";
import { createToken, Redis } from "../../../lib";
import { compareHash, generateRefreshTokenKey } from "../../../utils";
import {
  onFailureHandler,
  CommonStatusCode,
  CommonStatusMessage,
} from "../../../lib";

export const _signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user: UserIE = await findOneUser({ email });

    // DB 데이터 유효성 검사
    if (_.isUndefined(user)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    // 패스워드 검사
    if (!compareHash(password, user.password)) {
      onFailureHandler({
        status: CommonStatusCode.UNAUTHORIZED,
        message: CommonStatusMessage.UNAUTHORIZED,
      });
    }

    const refreshToken = createToken({
      email: user.email,
      nickname: user.nickname,
      jwtExpired: "3h",
    });

    // refreshToken 레디스 추가
    Redis.set(generateRefreshTokenKey(user.email), refreshToken);

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      token: createToken({
        email: user.email,
        nickname: user.nickname,
      }),
    };
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const _signUp = async ({
  email,
  password,
  nickname,
}: {
  email: string;
  password: string;
  nickname: string;
}) => {
  try {
    let user: UserIE = await findOneUser({ email });

    // 동일한 계정 정보가 있다면
    if (!_.isUndefined(user)) {
      onFailureHandler({
        status: CommonStatusCode.DUPLICATE,
        message: CommonStatusMessage.DUPLICATE,
      });
    }

    user = await updateUser({ email, password, nickname });

    return {
      id: user.id,
      email: user.email,
      nickname: user.password,
      token: createToken({ email: user.email, nickname: user.nickname }),
    };
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const _signOut = async ({ email }: { email: string }) => {
  try {
    if (_.isEmpty(email)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    Redis.remove(generateRefreshTokenKey(email));
    return {};
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};
