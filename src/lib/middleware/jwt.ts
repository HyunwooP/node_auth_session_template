import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as _ from "lodash";

import env from "../../config";
import { CommonStatusCode } from "../status";

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
}: {
  email: string;
  nickname: string;
}) => {
  return jwt.sign(
    {
      email,
      nickname: nickname,
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpired }
  );
};

export const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  const now = new Date().getTime();
  const token = _.isArray(req.headers.token)
    ? req.headers.token[0]
    : req.headers.token;

  if (!_.isUndefined(token)) {
    const jwtItem: any = jwt.verify(token, env.jwtSecret);

    if (now > jwtItem.exp) {
      // todo
      // 1. refreshToken이 유효하다면
      // 2. refreshToken이 유효하지 않다면
      res.status(CommonStatusCode.UNAUTHORIZED);
    }
  } else {
    /**
     * 토큰이 없다면 로그아웃 상태로 간주하고, 인증 처리가 필요한 액션을 고려
     */
    next();
  }
};
