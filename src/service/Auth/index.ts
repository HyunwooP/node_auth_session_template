import * as _ from "lodash";
import * as jwt from "jsonwebtoken";

import env from "../../config/env";
import { User } from "../../entity/User";
import { compareHash } from "../../utils";
import {
  getRepository,
  onFailureHandler,
  StatusCode,
  StatusMessage,
} from "../../lib";

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user: any = await getRepository(User).findOne({ email });

  // DB 데이터 유효성 검사
  if (_.isUndefined(user)) {
    onFailureHandler({
      status: StatusCode.NOT_FOUND,
      message: StatusMessage.NOT_FOUND,
    });
  }

  // 패스워드 검사
  if (!compareHash(password, user.password)) {
    onFailureHandler({
      status: StatusCode.UNAUTHORIZED,
      message: StatusMessage.UNAUTHORIZED,
    });
  }

  // 토큰 생성
  return {
    token: jwt.sign(
      {
        email,
        nickname: user.nickname,
      },
      env.jwtSecret,
      { expiresIn: "1h" }
    ),
  };
};

export const signOut = (req: any, res: any) => {};
