import * as jwt from "jsonwebtoken";
import * as _ from "lodash";

import { RequestIE, ResponseIE } from ".";
import {
  Redis,
  CommonStatusCode,
  onFailureHandler,
  CommonStatusMessage,
} from "..";
import { generateRefreshTokenKey } from "../../utils";
import env from "../../config";

/**
 * @description
 * 토큰안에 필요한 payload를 정립할 것.
 * @param {string} email
 * @returns {string} token
 */
export const createToken = ({
  userId,
  userEmail,
  jwtExpired,
}: {
  userId: number;
  userEmail: string;
  jwtExpired?: string | number;
}): string => {
  return jwt.sign(
    {
      userId,
      userEmail,
    },
    env.jwtSecret,
    { expiresIn: jwtExpired ?? env.jwtExpired }
  );
};

export const payloadToken = (token: string): string | object => {
  if (!_.isEmpty(token)) {
    return jwt.verify(token, env.jwtSecret, {
      ignoreExpiration: true,
    });
  }

  return {};
};

export const checkToken = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<void> => {
  const token = req.token;

  if (!_.isEmpty(token)) {
    /**
     * 로그인 상태
     */
    try {
      const now = new Date().getTime() / 1000;
      const jwtPayload: any = payloadToken(token);

      // 토큰이 유효하지 않다.
      if (now > jwtPayload.exp) {
        const refreshToken = await Redis.get(
          generateRefreshTokenKey(jwtPayload.email)
        );

        if (_.isEmpty(refreshToken)) {
          // 헤더에 토큰은 있으나, Redis에 refresh token이 상실되었다면
          res.sendStatus(CommonStatusCode.UNAUTHORIZED);
        }

        const refreshTokenPayload: any = payloadToken(refreshToken);
        if (now > refreshTokenPayload.exp) {
          // 유효하지 않은 refresh token 삭제
          Redis.remove(generateRefreshTokenKey(refreshTokenPayload.email));
          // refresh token이 유효하지 않기 때문에 로그인 재요청
          res.sendStatus(CommonStatusCode.UNAUTHORIZED);
        } else {
          // 토큰 연장
          res.status(CommonStatusCode.CREATE).send({
            token: createToken({
              userId: refreshTokenPayload.userId,
              userEmail: refreshTokenPayload.userEmail,
              jwtExpired: env.jwtExpired,
            }),
          });
        }
      } else {
        // 토큰이 유효하다.
        next();
      }
    } catch (e) {
      res.sendStatus(CommonStatusCode.UNAUTHORIZED);
    }
  } else {
    /**
     * 로그아웃 상태
     */
    next();
  }
};

export interface PayLoadIE {
  userId: number;
  userEmail: string;
}
export const getPayload = (token: string): PayLoadIE => {
  const payload: any = payloadToken(token);

  if (_.isEmpty(payload)) {
    onFailureHandler({
      status: CommonStatusCode.FORBIDDEN,
      message: CommonStatusMessage.FORBIDDEN,
    });
  }

  return {
    userId: payload.userId,
    userEmail: payload.userEmail,
  };
};
