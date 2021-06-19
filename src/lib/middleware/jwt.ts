import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as _ from "lodash";

import { CommonStatusCode } from "../status";
import { Redis } from "../../lib";
import env from "../../config";
import { generateRefreshTokenKey } from "../../utils";

/**
 * @description
 * 토큰안에 필요한 payload를 정립할 것.
 * @param {string} email
 * @param {string} nickname
 * @returns {string} token
 */
export const createToken = ({
  email,
  nickname,
  jwtExpired,
}: {
  email: string;
  nickname: string;
  jwtExpired?: string | number;
}) => {
  return jwt.sign(
    {
      email,
      nickname: nickname,
    },
    env.jwtSecret,
    { expiresIn: jwtExpired ?? env.jwtExpired }
  );
};

export const verifyToken = async (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  const token = _.isArray(req.headers.token)
    ? req.headers.token[0]
    : req.headers.token;

  if (!_.isEmpty(token)) {
    /**
     * 로그인 상태
     */
    try {
      const now = new Date().getTime();
      const jwtItem: any = jwt.verify(token, env.jwtSecret);

      // 토큰이 유효하지 않다.
      if (now > jwtItem.exp) {
        const refreshToken = await Redis.get(
          generateRefreshTokenKey(jwtItem.email)
        );

        if (_.isEmpty(refreshToken)) {
          // 헤더에 토큰은 있으나, Redis에 refresh token이 상실되었다면
          res.status(CommonStatusCode.UNAUTHORIZED);
        }

        const refreshTokenItem: any = jwt.verify(refreshToken, env.jwtSecret);

        if (now > refreshTokenItem.exp) {
          // 유효하지 않은 refresh token 삭제
          Redis.remove(generateRefreshTokenKey(refreshTokenItem.email));
          // refresh token이 유효하지 않기 때문에 로그인 재요청
          res.status(CommonStatusCode.UNAUTHORIZED);
        } else {
          // 토큰 연장
          res.send({
            token: createToken({
              email: refreshTokenItem.email,
              nickname: refreshTokenItem.nickname,
              jwtExpired: "1h",
            }),
          });
          // 컨트롤러 이동
          next();
        }
      } else {
        // 토큰이 유효하다.
        next();
      }
    } catch (e) {
      res.status(CommonStatusCode.UNAUTHORIZED);
    }
  } else {
    /**
     * 로그아웃 상태
     */
    next();
  }
};
