import * as _ from "lodash";
import { findOneUser, createUser } from "../../../models/User/service";
import { UserIE } from "../../User/entity";
import { compareHash, generateRefreshTokenKey } from "../../../utils";
import {
  createToken,
  Redis,
  onFailureHandler,
  CommonStatusCode,
  CommonStatusMessage,
  PayLoadIE,
  getPayload,
} from "../../../lib";

export const _signInUser = async (conditions: UserIE): Promise<UserIE> => {
  try {
    const user: UserIE = await findOneUser({ userEmail: conditions.userEmail });

    // DB 데이터 유효성 검사
    if (_.isUndefined(user)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    const isUser = user.userRoles.some((userRole) => {
      return userRole.role.roleName === "사용자";
    });

    // 권한 검사
    if (isUser === false) {
      onFailureHandler({
        status: CommonStatusCode.FORBIDDEN,
        message: CommonStatusMessage.FORBIDDEN,
      });
    }

    // 패스워드 검사
    if (!compareHash(conditions.userPw, user.userPw)) {
      onFailureHandler({
        status: CommonStatusCode.UNAUTHORIZED,
        message: CommonStatusMessage.UNAUTHORIZED,
      });
    }

    const refreshToken = createToken({
      userId: user.userId,
      userEmail: user.userEmail,
      jwtExpired: "3h",
    });

    // refreshToken 레디스 추가
    Redis.set(generateRefreshTokenKey(user.userEmail), refreshToken);

    return {
      userId: user.userId,
      userEmail: user.userEmail,
      userNickname: user.userNickname,
      token: createToken({
        userId: user.userId,
        userEmail: user.userEmail,
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

export const _signInAdmin = async (conditions: UserIE): Promise<UserIE> => {
  try {
    const user: UserIE = await findOneUser({ userEmail: conditions.userEmail });
    // DB 데이터 유효성 검사
    if (_.isUndefined(user)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    const isAdmin = user.userRoles.some((userRole) => {
      return userRole.role.roleName === "관리자";
    });

    // 권한 검사
    if (isAdmin === false) {
      onFailureHandler({
        status: CommonStatusCode.FORBIDDEN,
        message: CommonStatusMessage.FORBIDDEN,
      });
    }

    // 패스워드 검사
    if (!compareHash(conditions.userPw, user.userPw)) {
      onFailureHandler({
        status: CommonStatusCode.UNAUTHORIZED,
        message: CommonStatusMessage.UNAUTHORIZED,
      });
    }

    const refreshToken = createToken({
      userId: user.userId,
      userEmail: user.userEmail,
      jwtExpired: "3h",
    });

    // refreshToken 레디스 추가
    Redis.set(generateRefreshTokenKey(user.userEmail), refreshToken);

    return {
      userId: user.userId,
      userEmail: user.userEmail,
      userNickname: user.userNickname,
      token: createToken({
        userId: user.userId,
        userEmail: user.userEmail,
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

export const _signUp = async (conditions: UserIE): Promise<UserIE> => {
  try {
    let user: UserIE = await findOneUser({ userEmail: conditions.userEmail });

    // 동일한 계정 정보가 있다면
    if (!_.isUndefined(user)) {
      onFailureHandler({
        status: CommonStatusCode.DUPLICATE,
        message: CommonStatusMessage.DUPLICATE,
      });
    }

    user = await createUser(conditions);

    return {
      userId: user.userId,
      userEmail: user.userEmail,
      userNickname: user.userNickname,
      token: createToken({
        userId: user.userId,
        userEmail: user.userEmail,
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

export const _signOut = async (token: string): Promise<object> => {
  try {
    const payload: PayLoadIE = await getPayload(token);

    if (_.isEmpty(payload.userEmail)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    Redis.remove(generateRefreshTokenKey(payload.userEmail));
    return {};
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};
