import * as _ from "lodash";

import { findOne } from "../../../model/User/controller";
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
  const user: any = await findOne({ email });

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
};

export const _signOut = (req: any, res: any) => {};
