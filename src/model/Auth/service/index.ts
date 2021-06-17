import * as _ from "lodash";

import { findOne, update } from "../../../model/User/controller";
import { UserIE } from "../../../model/User/entity";
import { createToken } from "../../../lib";
import { compareHash } from "../../../utils";
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
    const user: UserIE = await findOne({ email });

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

    // 토큰 생성
    return {
      token: createToken({ email: user.email, nickname: user.nickname }),
    };
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
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
    let user: UserIE = await findOne({ email });

    // 동일한 계정 정보가 있다면
    if (!_.isUndefined(user)) {
      onFailureHandler({
        status: CommonStatusCode.DUPLICATE,
        message: CommonStatusMessage.DUPLICATE,
      });
    }

    user = await update({ email, password, nickname });

    return {
      email: user.email,
      nickname: user.password,
      token: createToken({ email: user.email, nickname: user.nickname }),
    };
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
    });
  }
};
